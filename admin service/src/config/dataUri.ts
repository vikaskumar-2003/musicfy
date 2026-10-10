
import path from "path"


// const getBuffer=(file:any)=>{


//    const parser=new DatauriParser()

//    const extname=path.extname(file.originalname).toString()

//    return parser.format(extname,file.buffer)

// }


const getBuffer = (file: Express.Multer.File) => {
    const dataUri = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

    return {
        content: dataUri,
    };
};

export default getBuffer;



