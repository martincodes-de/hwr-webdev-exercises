

window.onload = (event) => {

    var countlist = {
        Fight_Club: 0 ,
        DHDR1: 0,
        DHDR2: 0,
        DHDR3: 0,
        It: 0,
        1917: 0,
        MyNeighborTotoro: 0,
        PrincessMononoke: 0
    }

    function count(film){
        countlist[film]++
        console.log("hello " + film)
        console.log(countlist[film])
    }

    function evaluate(){
        
    }

    var max
    var maxName

    document.getElementById("Fight_Club").addEventListener("click",() => count("Fight_Club"))
    document.getElementById("DHDR1").addEventListener("click",() => count("DHDR1"))
    document.getElementById("DHDR2").addEventListener("click",() => count("DHDR2"))
    document.getElementById("DHDR3").addEventListener("click",() => count("DHDR3"))
    document.getElementById("It").addEventListener("click",() => count("It"))
    document.getElementById("1917").addEventListener("click",() => count("1917"))
    document.getElementById("MyNeighborTotoro").addEventListener("click",() => count("MyNeighborTotoro"))
    document.getElementById("PrincessMononoke").addEventListener("click",() => count("PrincessMononoke"))

    
}  