const express = require('express');
const bodyParser = require('body-parser');
const nedb = require('nedb-promise');
const cors = require('cors');

const ValidacaoUtils = require('./validacao-utils');

const db = nedb('banco.db');
const app = express();

db.loadDatabase();

app.use(bodyParser.json());
app.use(cors());

const MSG_OK  = "OK";
const MSG_FORMATO_INVALIDO  = "Formato inválido!";
const MSG_NAO_ENCONTADO  = "Nenhum item encontrado";

// GET ALL
app.get('/entradas', (req, res) => {
    db.find({}).then(entrada => {
        if(!entrada || !entrada.length) {
            res.status(404).send(MSG_NAO_ENCONTADO);
            return;
        }
        res.send(entrada);
    }).catch(() => res.status(500).end())
});

// GET ONE
app.get('/entrada', (req, res) => {
    db.find({ _id: req.params.id }).then(entrada => {
        if(!entrada || !entrada.length) {
            res.status(404).send(MSG_NAO_ENCONTADO);
            return;
        }
        res.send(entrada);
    }).catch(() => res.status(500).end())
});

// INSERT
app.post('/entrada', (req, res) => {
    if(ValidacaoUtils.isEntradaValida(req.body)) {
        db.insert(ValidacaoUtils.getCamposValidos(req.body)).then(() => {
            res.send(MSG_OK);
        }).catch(() => res.status(500).end());
    } else {
        res.status(400).send(MSG_FORMATO_INVALIDO);
    }
});

// UPDATE
app.put('/entrada', (req, res) => {
    if(ValidacaoUtils.isEntradaValida(req.body)) {
        db.update({ _id: req.body._id }, ValidacaoUtils.getCamposValidos(req.body))
        .then(() => {
            res.send(MSG_OK);
        }).catch(() => res.status(500).end());
    } else {
        res.status(400).send(MSG_FORMATO_INVALIDO);
    }    
});

/*
// DELETE
app.delete('/entrada/:id', (req, res) => {
    db.remove({ _id: req.params.id }).then(() => {
        res.send(MSG_OK);
    }).catch(() => res.status(500).end());
});
*/

//DELETE TO BODY
app.delete('/entrada', (req, res) => {
    db.remove({ _id: req.body._id }).then(() => {
        res.send(MSG_OK);
    }).catch(() => res.status(500).end());
});

console.log("Servidor iniciado na porta 1111...")
app.listen(1111, '0.0.0.0');