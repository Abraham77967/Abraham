// Hello SVG Animation Reset
document.addEventListener('DOMContentLoaded', function() {
    const hello = document.querySelector(".hello__div");
    
    if (hello) {
        setInterval(hello__function, 20000);
        
        function hello__function() {
            hello.style.display = "none";
            setTimeout(function () {
                hello.style.display = "flex";
            }, 10);
        }
    }
}); 