export function randomAnimation(){
    animations = [
        //require('../assets/splash.json'),
        require('../assets/rabbit-white-screen.json'),
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

function Graph(rabbits)
{
		V = rabbits.length
        for(let i=0; i<rabbits.length; i++){
            adj.set(rabbits[i].id, [])
        }
}

// Function to add an edge into the graph
function addEdge(rabbit)
{
    let fId = rabbit.fatherId
    let mId = rabbit.motherId
    if(fId!==''){
        adj.set(rabbit.id,[...adj.get(rabbit.id),fId])
        adj.set(fId,[...adj.get(fId),rabbit.id])
    }
        

    if(mId!==''){
        adj.set(rabbit.id,[...adj.get(rabbit.id),mId])
        adj.set(mId,[...adj.get(mId),rabbit.id])
    }
    

}

// prints BFS traversal from a given source s
function isReachable(s,d,rabbits)
{
	let temp;

		// Mark all the vertices as not visited(By default set
		// as false)
		let visited = new Array(V);
		for(let i = 0; i < V; i++)
			visited[rabbits[i].id] = false;
			
		// Create a queue for BFS
		let queue = [];

		// Mark the current node as visited and enqueue it
		visited[s] = true;
		queue.push(s);

		while (queue.length != 0)
		{
			// Dequeue a vertex from queue and print it
			n = queue.shift();
			
			if(n == d)
				return true;
            let position = adj.get(n)
			for(let i = 0; i < position.length; i++)
			{
				if (visited[position[i]] == false)
				{
					queue.push(position[i]);
					visited[position[i]] = true;
				}
			}
			
		}

		// If BFS is complete without visited d
		return false;
}





export const testCompatibility = (maleId,femaleId, rabbits, couples) => {

    if(couples.filter((item)=>item.male===maleId && item.female===femaleId).length>0){
        return false
    }
    Graph(rabbits)

    for(let i=0; i<rabbits.length; i++){
        addEdge(rabbits[i]);
    }

    return isReachable(maleId, femaleId,rabbits)
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
