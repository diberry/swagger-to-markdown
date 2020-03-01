import * as _  from "underscore";

const paths = (json:any) => {
    let final:any[] = [];

    _.keys(json.paths).forEach((path:any) => {

        let verbs:any[] = [];
        _.keys(json.paths[path]).forEach((verb:any) => {

            var codes = [];

            _.keys(json.paths[path][verb].responses).forEach((responseCode:any) => {

                codes.push(responseCode);
            });
            verbs.push(verb);
        });
        final.push({path: path, verbs: verbs});
    });
    //console.log(final[0].path);
    return final.sort((a,b)=> {
        let p1:any = a.path;
        let p2:any = b.path;

        return p1 < p2 ? -1 : p1 > p2 ? 1 : 0;
    });
}

export const swaggerToMarkdown = (swagger: any): string => {

    //let basePath = swagger.basePath;

    if(!swagger || swagger.length===0)return "";

    if((typeof swagger)==="string") swagger = JSON.parse(swagger);

    const list: any[] = paths(swagger);
    let response:string[]=[];

    for(let item of list){
        response.push(`${item.path} [ ${item.verbs.toString()}]`);
    }

    return response.join('<br>');
 }

