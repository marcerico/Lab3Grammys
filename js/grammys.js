$.ajax({
    url: 'data/grammys.json',
    type: 'GET',
    dataType: 'json',
    success: function(data){
        let select = document.getElementById("category_types")
        for (let i = 0; i < data.fields.length; i++) {
            var op = document.createElement("option")
            op.value = data.fields[i].field_id
            op.text = data.fields[i].field
            select.appendChild(op)
        }
        loadSectionInfo(data)
    },
    error: function(error_msg) {
        console.log(error_msg)
    },
})

function loadSectionInfo(data){
    document.getElementById("category_types").onchange = function() {
        let id = this.value
        //otra manera de hacer el for sin (let i = 0 ) blablabla empeznado desde el primero
        //cons del const  no sabes en que iteracion va
        //vas creando tus variables y appendiando los hijos
        for (const field of data.fields) {
            if (field.field_id == id) {
                let section = document.getElementById("nominees_section")

                //borrar todos los childs que sea que tenga el "Section"
                while(section.firstChild) {
                    section.removeChild(section.firstChild)
                }
                  //*SE PUEDE USAR "" O '' funciona de igual manera
                for (const category of field.categories) {
                    var divEl = document.createElement("div")
                    var catEl = document.createElement("h2")
                    var ulNomEl = document.createElement("ul")
                    let nominees = category.nominees

                    //para el winner
                    var nomWin= 0

                    for (const nominee of nominees) {
                        var liNomEl = document.createElement('li')
                        liNomEl.textContent = nominee.nominee
                        if (nomWin == category.winner_id) {
                            var spanEl= document.createElement('span')
                            spanEl.textContent = 'WINNER'
                            spanEl.classList.add('winner')
                            liNomEl.appendChild(spanEl)
                        }
                        ulNomEl.appendChild(liNomEl)
                        ulNomEl.append(document.createElement('br'))
                        var artistEl= document.createElement('p')
                        artistEl.textContent = nominee.artist
                        ulNomEl.appendChild(artistEl)
                        nomWin ++
                    }
                    catEl.textContent = category.category_name
                    divEl.appendChild(catEl)
                    divEl.appendChild(ulNomEl)
                    section.appendChild(divEl)
                }
            }
        }
    }
}
