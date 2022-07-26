function GetValuesToWrite(){
    let titulo_value = document.getElementById("Title").value;
    let desc_value = document.getElementById("Desc").value;
    let category_value = document.getElementById("Category").value;
    console.log("Titulo: " + titulo_value);
    console.log("Descrição: " + desc_value);
    console.log("Categoria: " + category_value);
    var obj = new Object();
    obj.titulo = titulo_value;
    obj.desc  = desc_value;
    obj.categoria = category_value;
    var jsonString= JSON.stringify(obj);
    console.log(JSON.parse(jsonString));
}