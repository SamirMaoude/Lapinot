import {Platform, ToastAndroid, AlertIOS} from 'react-native'

export function randomAnimation(){
    animations = [
        //require('../assets/splash.json'),
        require('../assets/anim-logo.json'),
        require('../assets/presto-rabbit.json'),
        require('../assets/rabbit-white-screen.json')
    ]
    let i = animations.length - 1
    let animIndex = Math.floor(Math.random() * i)

    return animations[animIndex]
    
}

// Javascript program to check if there is exist a path between two vertices
// of a graph.
let V;
let adj=new Map();
let visited = new Array();
let tempAncestors = new Array()
function Graph(rabbits)
{
		V = rabbits.length
        adj=new Map();
        visited = new Array();
        tempAncestors = new Array()

        for(let i=0; i<rabbits.length; i++){
            adj.set(rabbits[i].id, [])
            visited[rabbits[i].id] = false;
        }
}

// Function to add an edge into the graph
function addEdge(rabbit)
{
    let fId = rabbit.fatherId
    let mId = rabbit.motherId
    if(fId!==''){
        adj.set(rabbit.id,[...adj.get(rabbit.id),fId])
    }
        

    if(mId!==''){
        adj.set(rabbit.id,[...adj.get(rabbit.id),mId])
    }
    

}


function dfs(u){

    if(visited[u]) return

    visited[u] = true;
    tempAncestors.push(u);
    let pos = adj.get(u)
    for(let i=0; i< pos.length; i++){
        dfs(pos[i]);
    }
    
}






export const testCompatibility = (maleId,femaleId, rabbits) => {

    let maleAncestors = []
    let femaleAncestors = []
    Graph(rabbits)
    for(let i=0; i<rabbits.length; i++){
        addEdge(rabbits[i]);
    }
    dfs(maleId)
    maleAncestors = tempAncestors;


    Graph(rabbits)
    for(let i=0; i<rabbits.length; i++){
        addEdge(rabbits[i]);
    }

    dfs(femaleId)
    femaleAncestors = tempAncestors;

    for(let rabbit of maleAncestors){
        if(femaleAncestors.includes(rabbit)){
            return true;
        }
    }

    return false
}


export const rabbitStats = (id, reproductions)=>{
    let total_alive = 0
    let total_dead = 0

    let rabbit_rep = reproductions.filter((item)=>item.maleId===id||item.femaleId==id)
    n = rabbit_rep.length
    if(n==0){
        return {alive:0, deads:0, totalRep:n}
    }

    for(let i=0; i<n; i++){
        total_alive += rabbit_rep[i].alive
        total_dead += rabbit_rep[i].deads
    }

    return {alive:Math.ceil(total_alive/n), deads:Math.ceil(total_dead/n), totalRep:n}
}


export const globalStats = (reproductions)=>{

    let total_alive = 0
    let total_dead = 0

    n = reproductions.length
    if(n==0){
        return {alive:0, deads:0}
    }

    for(let i=0; i<n; i++){
        total_alive += reproductions[i].alive
        total_dead += reproductions[i].deads
    }

    return {alive:Math.ceil(total_alive/n), deads:Math.ceil(total_dead/n)}

}


function compare(a,b){
    if(a.avg_alive>b.avg_alive){
        return -1
    }

    if(a.avg_alive==b.avg_alive){
        if(a.avg_deads<b.avg_deads){
            return -1
        }

        if(a.avg_deads==b.avg_deads){
            if(a.n>b.n){
                return -1
            }
        }
    }
    return 0
}
export const sorted_rabbits = (rabbits, reproductions)=>{

    let list = []

    for(let rabbit of rabbits){
        let data = rabbitStats(rabbit.id, reproductions)
        if(data.totalRep>0)
        list.push({
            ...rabbit,
            avg_alive: data.alive,
            avg_deads: data.deads,
            n: data.totalRep
        })
    }

    list.sort(
        compare
    )
    
    return list
}


export function notifyMessage(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT)
    } else {
      AlertIOS.alert(msg);
    }
  }
