import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";
// @ts-ignore
import * as cors from "cors";

admin.initializeApp(functions.config().firebase);
const db = admin.firestore(); // Add this

const app = express();
const main = express();
//options for cors midddleware
// const options:cors.CorsOptions = {
//     allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
//     credentials: true,
//     methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
//     origin: "*",
//     preflightContinue: false
// };

main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(cors());

export const webApi = functions.https.onRequest(main);

app.post('/case', async (request, response) => {
    try {
        const { name,manager, date, url ,COI} = request.body;
        const data =  {
            name,
            manager,
            date,
            url,
            COI
        }
        await db.collection('cases').doc(data.name).set(data);
        response.json({
            id: data.name,
            data: data
        });
    } catch(error){

        response.status(500).send(error);

    }
});

app.get('/cases/:id', async (request, response) => {
    try {
        const caseID = request.params.id;
        if (!caseID) throw new Error('Case ID is required');

        const caseRef = await db.collection('cases').doc(caseID).get();

        if (!caseRef.exists){
            throw new Error('Case doesnt exist.')
        }

        response.json({
            id: caseRef.id,
            data: caseRef.data()
        });

    } catch(error){

        response.status(500).send(error);

    }
});

app.get('/cases', async (request, response) => {
    try {

        const caseQuerySnapshot = await db.collection('cases').get();
        const casesRef: { id: string; data: FirebaseFirestore.DocumentData; }[] = [];
        caseQuerySnapshot.forEach(
            (doc) => {
                casesRef.push({
                    id: doc.id,
                    data: doc.data()
                });
            }
        );

        response.json(casesRef);

    } catch(error){

        response.status(500).send(error);

    }

});

app.put('/cases/:id', async (request, response) => {
    try {

        const caseID = request.params.id;
        const title = request.body.title;

        if (!caseID) throw new Error('id is blank');

        if (!title) throw new Error('Title is required');

        const data = {
            title
        };
        await db.collection('cases')
            .doc(caseID)
            .set(data, { merge: true });

        response.json({
            id: caseID,
            data
        })


    } catch(error){

        response.status(500).send(error);

    }

});

app.delete('/cases/:id', async (request, response) => {
    try {

        const caseID = request.params.id;

        if (!caseID) throw new Error('id is blank');

        await db.collection('cases')
            .doc(caseID)
            .delete();

        response.json({
            id: caseID,
        })


    } catch(error){

        response.status(500).send(error);

    }

});

app.post('/document', async (request, response) => {
    try {
        const { CaseID, urls} = request.body;
        const data =  {
            CaseID,
            urls
        }
        await db.collection('documents').doc(data.CaseID).set(data);
        response.json({
            id: 'document added',
        });

    } catch(error){

        response.status(500).send(error);

    }
});

app.get('/document/:id', async (request, response) => {
    try {
        const CaseID = request.params.id;

        if (!CaseID) throw new Error('Document ID is required');

        const caseRef = await db.collection('documents').doc(CaseID).get();

        if (!caseRef.exists){
            throw new Error('Fight doesnt exist.')
        }

        response.json({
            id: caseRef.id,
            data: caseRef.data()
        });

    } catch(error){

        response.status(500).send(error);

    }
});

app.get('/documents', async (request, response) => {
    try {

        const documentQuerySnapshot = await db.collection('documents').get();
        const documentRef: { id: string; data: FirebaseFirestore.DocumentData; }[] = [];
        documentQuerySnapshot.forEach(
            (doc) => {
                documentRef.push({
                    id: doc.id,
                    data: doc.data()
                });
            }
        );

        response.json(documentRef);

    } catch(error){

        response.status(500).send(error);

    }

});



app.delete('/documents/:id', async (request, response) => {
    try {

        const CaseID = request.params.id;

        if (!CaseID) throw new Error('id is blank');

        await db.collection('documents')
            .doc(CaseID)
            .delete();

        response.json({
            id: CaseID,
        })


    } catch(error){

        response.status(500).send(error);

    }

});
