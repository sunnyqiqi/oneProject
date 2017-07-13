window.onload = function(){
            var ulNode = document.getElementById("hright");
            var liNodes = document.getElementById("hright").children;
            var a=document.getElementsByTagName("li").children;
            console.log( liNodes);          
 			for(var i=0, l = liNodes.length; i < l; i++){
                (function(i){
                    liNodes[i].addEventListener("mousedown",function () {
                        liNodes[i].setAttribute("class","blue");
                    })
                    liNodes[i].addEventListener("mouseup",function () {
                         liNodes[i].removeAttribute("class","blue");
                    })
                })(i);
            }
        }