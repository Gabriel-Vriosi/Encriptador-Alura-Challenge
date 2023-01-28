document.addEventListener('DOMContentLoaded', () => {

//************************************************************************************************************* */

    //Checkea que los caracteres sean validos, de lo contrario retorna false.
    function check_characters(key, type = "single") {

        pattern = /^[a-zñ\r\n\s]+$/

        if (type == "single"){

            exeptions = [8, 9, 13, 16, 17, 18, 20, 27, 32, 33, 34, 35, 36, 45, 46, 91, 92, 93, 112, 113, 114,
            115, 116, 117, 118, 119, 120, 121, 122, 123]

            if (pattern.test(key.key) || exeptions.includes(key.keyCode) || key.code == "") {

                return true;
            } else{

                return false;
            }
        }
        
        if (type == "all" && key != "") {

            return pattern.test(key)
        }
    }

//************************************************************************************************************* */
    
    // Codifica los caracteres retorna false en caso de no poder
    function encoder() {

        text = keyboard.value;
        
        if (text != "") {

            if (check_characters(text, "all") == true){
    
                change_on_input(true);
    
                var aux = "";
    
                for (let i = 0; i < text.length; i++) {
                    
                    switch (text.charAt(i)) {
                        
                        case "a":
                            aux = aux + "ai";
                            break;

                        case "e":
                            aux = aux + "enter";
                            break;

                        case "i":
                            aux = aux + "imes";
                            break;

                        case "o":
                            aux = aux + "ober";
                            break;

                        case "u":
                            aux = aux + "ufat";
                            break;

                        default:
                            aux = aux + text.charAt(i);
                    }
                }
                text = aux
                return text

            } else {

                change_on_input(false);
                return false;
            }
        }
        return false
    }

//************************************************************************************************************* */
    
    // Decoodifica los caracteres retorna falso en caso de no poder
    function decoder() {

        text = keyboard.value;
        
        if (text != "") {

            if (check_characters(text, "all") == true){
    
                change_on_input(true);
    
                text = text.replace(/ai/g, "a");
                text = text.replace(/enter/g, "e");
                text = text.replace(/imes/g, "i");
                text = text.replace(/ober/g, "o");
                text = text.replace(/ufat/g, "u");

                return text
            } else {
    
                change_on_input(false);
                return false;
            }
        }
        return false
    }

//************************************************************************************************************* */

    // Muestra el texto decodificado o encriptado
    function show_new_text(type){

        new_text = document.querySelector("#new-text");
        check = false

        if (keyboard.value != "") {
            
            //encode block
            if (type == "decode" && ((text = decoder()) != false)) {
    
                copy_button = document.querySelector("#copy").style.display = "flex";
                muñeco = document.querySelector("#muñeco").style.display = "none";
                frame_5 = document.querySelector("#frame-5").style.display = "none";
                
                new_text.style.display = "flex";
                new_text.value = text;
                check = true
    
            // decode block
            } else if (type == "encode" && ((text = encoder()) != false)) {
    
                copy_button = document.querySelector("#copy").style.display = "flex";
                muñeco = document.querySelector("#muñeco").style.display = "none";
                frame_5 = document.querySelector("#frame-5").style.display = "none";
                
                new_text.style.display = "flex";
                new_text.value = text;
                check = true
            }

            // transiciones del area de texto final
            if (check == true) {
                
                setTimeout(function() {
                    new_text.style.transition = "opacity 0s";
                    new_text.style.opacity = "0";
                }, 0);
            
                setTimeout(function() {
                    new_text.style.transition = "opacity 2s";
                    new_text.style.opacity = "1";
                    new_text.focus()
                }, 100);
            }else{
                new_text.value = "";
            }
        }
    }

//************************************************************************************************************* */

    // Cambia el color y otras propiedades del area de texto segun si recibe true o false
    function change_on_input(key) {
        frame_1_text = document.querySelector("#frame-1 p");
        frame_1_sign = document.querySelector("#frame-1 span");

        if (key == false) {
            
            keyboard.style.color = "var(--red)";
            keyboard.style.border = "3px solid var(--red)";
            keyboard.style.outline = "none"
            frame_1_text.style.color = "var(--red)";
            frame_1_text.style.opacity = "1";
            frame_1_sign.style.background = "var(--red)";
            keyboard.focus();

            return false;
        } else {

            keyboard.style.color = "var(--dark-blue-400)";
            keyboard.style.border = "none";
            keyboard.style.outline = "none"
            frame_1_text.style.color = "var(--gray-400)";
            frame_1_text.style.opacity = "0.8";
            frame_1_sign.style.background = "var(--gray-400)";
            return true;
        }
    }

//************************************************************************************************************* */

    // Copia el texto ubicado en el area donde se muestra el mensaje final
    function copy_text() {
        var copied_text = document.querySelector("#new-text").value;

        if (copied_text != "" && navigator.clipboard) {
            
            navigator.clipboard.writeText(copied_text);
            alert("Copied!")
        } else{
            alert("error, try copying manually")
        }
    }

//************************************************************************************************************* */

    // constante keyboard donde se va a registrar evento del teclado
    const keyboard = document.querySelector("#input-text");

    keyboard.addEventListener('keydown', key =>{

        console.log(key)
        
        if (check_characters(key) == false) {
            
            key.preventDefault();
            change_on_input(false);
            
        } if (check_characters(key) == true) {

            change_on_input(true);
        }
    });
    
//************************************************************************************************************* */

    // Eventos de click en botones encriptar, desencriptar y copiar
    document.querySelector("#frame-3-button-1").addEventListener("click", click =>{
        show_new_text("encode");
    });

    document.querySelector("#frame-3-button-2").addEventListener("click", click =>{
        show_new_text("decode");
    });

    document.querySelector("#copy").addEventListener("click", click =>{
        copy_text(); 
    });

//************************************************************************************************************* */
});
