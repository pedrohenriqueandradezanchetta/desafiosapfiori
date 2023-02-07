sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("googleimagens.controller.Inicial", {
            onInit: function () {
                //COLCHETE INDICA QUE VARIAVEL É DO TIPO TABELA INTERNA DO ABAP
                //VAMOS FAZER UMM TABLE TYPE DENTRO DE UMA ESTRUTURA
                let ImageList = {
                    Imagens : [
                     /*{
                        url : "https://seeklogo.net/wp-content/uploads/2013/12/fanta-uva-vector-logo.png",
                        thumbnail : "https://seeklogo.net/wp-content/uploads/2013/12/fanta-uva-vector-logo.png",
                        title : "Fanta Uva vector logo free download - Vectorlogofree.com",
                        provider : {
                        name : "seeklogo"
                        }
                    },
                    {
                        url : "https://assets.suitcasemag.com/images/landscape/200541-uva-festival-people-1.jpg",
                        thumbnail : "https://assets.suitcasemag.com/images/landscape/200541-uva-festival-people-1.jpg",
                        title : "Fanta Uva vector logo free download - Vectorlogofree.com",
                        provider : {
                        name : "seeklogo"
                        }
                    }*/
                    
                    ]
                }

                // CRIAÇÃO DO MODELO PARA EXIBIR DADOS NA TELA
                let ImageModel = new JSONModel(ImageList)
                let view = this.getView()
                view.setModel(ImageModel, "ModeloImagem")

            },
            onPressBuscar: function(){
                let inputBusca = this.byId("inpBusca")
                let query = inputBusca.getValue()
                //alert(query)

                const settings = {
                    "async": true,
                    "crossDomain": true,
                    //concatenate
                    "url": "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q="
                    + query
                    + "&pageNumber=1&pageSize=10&autoCorrect=true",
                    "method": "GET",
                    "headers": {
                        "X-RapidAPI-Key": "5d5bbf1f9fmsh5caf2a682a22ac2p164467jsn25e9bc8f01f2",
                        "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
                    }
                };
                
                $.ajax(settings).done(function (response) {
                    console.log(response);

                    let oImageModel = this.getView().getModel("ModeloImagem")
                    let oDadosImage = oImageModel.getData()

                    // clear tabela interna = array
                    oDadosImage.Imagens = []

                    //loop que adiciona dados de uma tabela em outra tabela
                    let listaResultados = response.value
                    let newItem

                    //vamos ao loop = for
                    for (var i = 0; i < listaResultados.length; i++ ){
                        //read table pelo indice
                        newItem = listaResultados[i]
                        //append dos dados na nova tabela
                        oDadosImage.Imagens.push(newItem)
                    }

                    oImageModel.refresh()

                }.bind(this)
                );

                // CRIAÇÃO DO MODELO PARA EXIBIR DADOS NA TELA
                //let ImageModel = new JSONModel(ImageList)
                //let view = this.getView()
                //view.setModel(ImageModel, "ModeloImagem")
            }
        });
    });
