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