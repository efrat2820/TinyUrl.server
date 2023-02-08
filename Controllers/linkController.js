import context from "../Contexts/linkContext.js"

const LinkController = {

    getList: async(req,res)=>{
        let links = await context.getAllLink();
        res.send(links);
    },

    getById: async(req,res)=>{
        const link = await context.getLinkById(req.params.id);
        res.send(link);
    },

    add: async(req,res)=>{
        const {originalUrl,uniqueName} = req.body;
        console.log('req.body', req.body)
        await context.addLink(req/*,originalUrl,uniqueName*/);
        // const tinyLink = "https://tinyurl-m5pd.onrender.com/TinyUrl/"+uniqueName;
        const tinyLink = "http://localhost:5000/TinyUrl/"+uniqueName;
        res.send(tinyLink);
    },

    update: async(req,res)=>{
        const {id} = req.params;
        const {originalUrl} = req.body;

        const updateLink = await context.updateLink(id,{originalUrl});
        res.send(updateLink);
    },

    delete: async(req,res)=>{
        const deleted = await context.removeLink(req.params.id);
        res.send(deleted);
    },

    redirect: async(req,res)=>{
        const {uniqueName} = req.params;
        const originalUrl = await context.redirectLink(uniqueName);
        console.log(originalUrl);
        res.redirect(originalUrl);
        
    }

}

export default LinkController;