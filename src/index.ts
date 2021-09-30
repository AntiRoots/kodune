import express, { Request, Response, Application } from 'express';

const app: Application = express();
app.use(express.json());
const port: number = 3000;
const ok: number =200;
const created: number =201;
const  badRequest:number = 400;
const noContent:number= 204;
const db ={
    lectors:
    [ {
        id: 1,
        firstName:'Aadu',
        lastName: 'Juurikas',

    },
    {
        id: 2,
        firstName:'Ann',
        lastName: 'Mardikas',
    }

    ],
    subjects:[
        { 
            subID:1,
            name:'Prog_I',
            room: '208',
        },
        {
            subID:2,
            name:'Prog_II',
            room: '307',
        }
    ],
    courses:[
        {
            corID: 1, 
            shortName:"KTD1",
            corName: "Käsitöölised",
        },
        {
            corID:2,
            shortName:"LO1",
            corName: "KLiiklusohutus",
        }
    ]
    }

app.get('/lectors', (req: Request, res: Response) => {
    const {lectors} = db;   
    res.status(ok).json({
        lectors,
        });
      });

app.get('/lectors/:id', (req: Request, res: Response) => {
    const id: number =parseInt(req.params.id);
    const lector=db.lectors.find((element)=>element.id===id);
    res.status(ok).json({
        lector,    
  });
});

app.get('/subjects/:subID', (req: Request, res: Response) => {
    const subID: number =parseInt(req.params.subID);
    const subject=db.subjects.find((element)=>element.subID===subID);
    res.status(ok).json({
        subject,    
  });
});

app.get('/courses/:corID', (req: Request, res: Response) => {
    const corID: number =parseInt(req.params.corID);
    const course=db.courses.find((element)=>element.corID===corID);
    res.status(ok).json({
        course,    
  });
});

app.post('/lectors', (req: Request, res: Response) => {
    const {firstName,lastName}=req.body;
    const id = db.lectors.length+1;
    db.lectors.push({
        id,
        firstName,
        lastName,
    });
    console.log(firstName,lastName);
    res.status(created).json({
      id
    
    });
  });

  app.post('/subjects', (req: Request, res: Response) => {
    const {name,room}=req.body;
    const subID = db.subjects.length+1;
    db.subjects.push({
        subID,
        name,
        room,
    });
    console.log(name,room);
    res.status(created).json({
      subID
    
    });
  });
  app.post('/courses', (req: Request, res: Response) => {
    const {shortName,corName}=req.body;
    const corID = db.courses.length+1;
    db.courses.push({
        corID,
        shortName,
        corName,
    });
    console.log(shortName,corName);
    res.status(created).json({
      corID
    
    });
  });

  app.delete('/lectors/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(badRequest).json({
        error: 'No valid id provided',
      });
    }
    const index = db.lectors.findIndex((element) => element.id === id);
    if (index < 0) {
      return res.status(badRequest).json({
        message: `Lector not found with id: ${id}`,
      });
    }
    db.lectors.splice(index, 1);
    return res.status(noContent).json({});
  });

  app.delete('/courses/:corID', (req: Request, res: Response) => {
    const corID: number = parseInt(req.params.corID, 10);
    if (!corID) {
      return res.status(badRequest).json({
        error: 'No valid corID provided',
      });
    }
    const index = db.courses.findIndex((element) => element.corID === corID);
    if (index < 0) {
      return res.status(badRequest).json({
        message: `Course not found with corID: ${corID}`,
      });
    }
    db.courses.splice(index, 1);
    return res.status(noContent).json({});
  });

  app.patch('/courses/:corID', (req: Request, res: Response) => {
    const corID: number = parseInt(req.params.corID, 10);
    const { shortName,corName } = req.body;
    if (!shortName && !corName) {
      return res.status(badRequest).json({
        error: 'Nothing to update',
      });
    }
    const index = db.courses.findIndex((element) => element.corID === corID);
    if (index < 0) {
      return res.status(badRequest).json({
        error: `No course found with corID: ${corID}`,
      });
    }
    db.courses[index].shortName = shortName;
    db.courses[index].corName = corName;
    return res.status(noContent).json({});
  });

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});