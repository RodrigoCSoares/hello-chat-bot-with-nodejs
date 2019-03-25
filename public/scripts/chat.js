const USER = "user";
const CHATBOT = "chatbot"

var context = '{}';
var user = {};
var chatbot = {};

function enviarMensagem() {
    // recupera mensagem digitada pelo usuário e exibe na tela
    var texto = document.chatForm.texto.value;
    console.log(texto);
    
    chat = document.getElementsByName('chat');
    insertChat(USER, texto);

    // cria objeto para envio para a API
    var input = {
        text: texto,
        context
    };

    // post para o serviço criado
    $.ajax({
        url: 'watsonAssistant',
        type: 'post',
        data: input,
        // tratamento de erro do post
        error: function (dados) {
            alert('Erro: ' + dados.data);
        },
        // tratamento de sucesso de processamento do post
        success: function (dados) {
            // se ocorreu algum erro no processamento da API
            if (dados.status === 'ERRO')
                alert('Erro: ' + dados.data);
            // caso os dados tenham retornado com sucesso
            else{
                // exibe retorno da API e recupera o contexto para o próximo diálogo
                insertChat(CHATBOT, dados.data.output.text);
                console.log(dados.data.output.text);
            }
        }
    });
}       

function insertChat(who, text, time = 0){
    var control = "";
    var date = formatAMPM(new Date());
    
    if (who == CHATBOT){
        
        control = '<li style="width:100%">' +
                        '<div class="msj macro">' +
                            '<div class="text text-l">' +
                                '<p>'+ text +'</p>' +
                                '<p><small>'+date+'</small></p>' +
                            '</div>' +
                        '</div>' +
                    '</li>';                    
    }else{
        control = '<li style="width:100%;">' +
                        '<div class="msj-rta macro">' +
                            '<div class="text text-r">' +
                                '<p>'+text+'</p>' +
                                '<p><small>'+date+'</small></p>' +
                            '</div>' +
                        '<div class="avatar" style="padding:0px 0px 0px 10px !important"></div>' +                                
                  '</li>';
    }
    setTimeout(
        function(){                        
            $("ul").append(control);

        }, time);
    
}

function resetChat(){
    $("ul").empty();
}


function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}