module.exports = {
    newStudy(study){
    var errors = [];

    if(!study.title || typeof study.title == undefined || study.title == null){
        errors.push({text: "Você precisa definir um título!"});
    } else if(study.title.length < 8){
        errors.push({text: "Escreva um título mais detalhado. Você consegue!"})
    }

    if(study.description){
        if(study.description.length < 10){
            errors.push({text: "Capriche na descrição! Ela está muito curta."});
        }        
    } 

    if(!study.category || typeof study.category == undefined ||
        study.category == null){
        errors.push({text: "Você precisa definir uma categoria!"});
    } else if(study.category.length < 2){
        errors.push({text: "Escreva uma categoria mais detalhada. Você consegue!"})
    }

    if(!study.content || typeof study.content == undefined ||
        study.content == null){
        errors.push({text: "Você precisa definir um conteúdo!"});
    } else if(study.content.length < 20){
        errors.push({text: "Escreva um conteúdo mais detalhado. Você consegue!"})
    }

    return errors;
},
newCategory(category){
    var errors = [];
    var name = category.name;

    if(!name || typeof name == undefined || name == null){
        erros.push({text: "Nome inválido!"})
    }

    if(name.length < 4){
        errors.push({text: "O nome da categoria é muito pequeno!"})
    }
    
    return errors;
}
}
