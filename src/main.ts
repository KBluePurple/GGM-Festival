import './app.css'
import "carbon-components-svelte/css/g100.css";
import App from './App.svelte'

const app = new App({
    target: document.getElementById('app')
})

export default app

