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


main.use('/api/v1', app);
main.use(bodyParser.json());
//adding cors to solve the issue described in the report
app.use(cors());
export const webApi = functions.https.onRequest(main);

// post handler for case
app.post('/case', async (request, response) => {
    try {
        const { name,manager, date ,COI, usersWithCOI} = request.body;
        const data =  {
            name,
            manager,
            date,
            COI,
            usersWithCOI
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
// get handler for case
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
//get handler for all cases
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
//put handler for cases
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
//delete handler for cases
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
//post handler for documents
app.post('/document', async (request, response) => {
    try {
        const { DocumentID, urls} = request.body;
        const data =  {
            DocumentID,
            urls
        }
        await db.collection('documents').doc(data.DocumentID).set(data);
        response.json({
            id: 'document added',
        });

    } catch(error){

        response.status(500).send(error);

    }
});
//get handler for document by id
app.get('/document/:id', async (request, response) => {
    try {
        const DocumentID = request.params.id;

        if (!DocumentID) throw new Error('Document ID is required');

        const documentRef = await db.collection('documents').doc(DocumentID).get();

        if (!documentRef.exists){
            throw new Error('File doesnt exist.')
        }

        response.json({
            id: documentRef.id,
            data: documentRef.data()
        });

    } catch(error){

        response.status(500).send(error);

    }
});
// get handler for all documents
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
//delete handler for documents by id
app.delete('/documents/:id', async (request, response) => {
    try {

        const DocumentID = request.params.id;

        if (!DocumentID) throw new Error('id is blank');

        await db.collection('documents')
            .doc(DocumentID)
            .delete();

        response.json({
            id: DocumentID,
        })


    } catch(error){

        response.status(500).send(error);

    }

});
