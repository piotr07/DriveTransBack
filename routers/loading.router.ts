import {Router} from "express";
import {LoadingRecord} from "../records/loading.record";

export const loadingRouter = Router()

    .get('/search/:name?', async (req, res) => {
        const loadings = await LoadingRecord.findAll(req.params.name ?? '');
        res.json(loadings);
    })

    .get('/:id', async (req, res) => {
        const loading = await LoadingRecord.getOne(req.params.id);
        res.json(loading);
    })

    .post('/', async (req, res) => {
        const loading = new LoadingRecord(req.body);
        await loading.insert();
        res.json(loading);
    });