const desc = document.querySelector('#descricao')
const val = document.querySelector('#value')
const input = document.querySelector('#Entrada')
const btn = document.querySelector('#button')
const container = document.getElementById('data')
const totSaida = document.getElementById('sai')
const totEntrada = document.getElementById('ent')
const totBal = document.getElementById('total')
let banco =  localStorage.getItem('banco')?JSON.parse(localStorage.getItem('banco')):[]
let transferencias;

const atualizarDisplay = () =>{
    banco = localStorage.getItem('banco')?JSON.parse(localStorage.getItem('banco')):[]
    banco.forEach(
        (elemento, index)=> {
            const transacao = document.createElement('div')
            transacao.setAttribute('class','descViewport')
            transacao.setAttribute('data-id',`${index}`)
            transacao.innerHTML=`
                <p>${elemento.desc}</p>
                <p>${elemento.val}</p>
                <p>${elemento.radio==='true'?'+':'-'}</p>
                <p class ='bin' id ='bin'>🗑️</p>
            
            `
            document.getElementById('data').appendChild(transacao)
    })
    transferencias=document.querySelectorAll('.descViewport').forEach(transferencia => transferencia.addEventListener('click',removerTransacao))
    valorEntradas()
    valorSaidas()
    balancoTot()
}

const limparTransacoes = () =>{
    const container = document.getElementById('data')
    while(container.firstChild){
        container.removeChild(container.lastChild)
    }
}
const adicionarTransacao=()=>{
    limparTransacoes()
    banco.push({'desc':`${desc.value}`,'val':`${val.value}`,'radio':`${input.checked}`})
    localStorage.setItem('banco',JSON.stringify(banco))
    atualizarDisplay()    
}
btn.addEventListener('click', adicionarTransacao)

const valorEntradas = () =>{
    const entrada = document.getElementById('ent')
    const tranEnt = banco.filter((element) => element.radio ==='true')
    let totEnt = 0;
    for(let i =0; i < tranEnt.length; i++){
         totEnt = parseFloat(totEnt) + parseFloat(tranEnt[i].val)
    }
    totEntrada.innerHTML = `R$ ${totEnt}`
}
const valorSaidas = () =>{
    const tranSai = banco.filter((element) => element.radio !='true')
    let totSai = 0;
    for(let i =0; i < tranSai.length; i++){
         totSai = parseFloat(totSai) + parseFloat(tranSai[i].val)
    }
    totSaida.innerHTML = `R$ ${totSai}`
}

const balancoTot = () =>{
    const tranEnt = banco.filter((element) => element.radio ==='true')
    const tranSai = banco.filter((element) => element.radio !='true')
    let totEnt = 0;
    let total = 0;
    for(let i =0; i < tranEnt.length; i++){
        totEnt = parseFloat(totEnt) + parseFloat(tranEnt[i].val)
   }
   let totSai = 0;
    for(let i =0; i < tranSai.length; i++){
         totSai = parseFloat(totSai) + parseFloat(tranSai[i].val)
    }
    total = parseFloat(totEnt) - parseFloat(totSai)
    totBal.innerHTML = `R$ ${total}`
  
}
atualizarDisplay()

function removerTransacao(event){
  if(event.target.id == 'bin'){
    const index = event.target.dataset.id
    banco.splice(index,1)
    limparTransacoes()
    localStorage.setItem('banco',JSON.stringify(banco))
    atualizarDisplay()
  }
}
