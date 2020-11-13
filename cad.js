class Formulario {
    constructor() {
        this.dados = localStorage.getItem('tbInfo') === null?[]:JSON.parse(localStorage.getItem('tbInfo'))
    }

    salva(cadastro) {
        if(document.getElementById('codigo').getAttribute('disabled')==='disabled'){
            this.remove(cadastro.codigo)
        }

        this.dados.push(cadastro)
        localStorage.setItem('tbInfo', JSON.stringify(this.dados))
    }

    remove(codigo) {
        let index = this.dados.findIndex(cadastro => cadastro.codigo === codigo)
        this.dados.splice(index, 1)

        localStorage.setItem('tbInfo', JSON.stringify(this.dados))
        cadastro.atualiza()
    }

    edita(cadastro) {
        document.getElementById('codigo').setAttribute('disabled', 'disabled')
        document.getElementById('codigo').value = cadastro.codigo
        document.getElementById('nome').value = cadastro.nome
        document.getElementById('email').value = cadastro.email
        document.getElementById('telefone').value = cadastro.telefone
        document.getElementById('endereco').value = cadastro.endereco
        document.getElementById('vaga').value = cadastro.vaga
    }

    tabela() {
        const listagem = this.dados.map((cadastro) => (
            `<tr>
            <td>${cadastro.codigo}</td>
            <td>${cadastro.nome}</td>
            <td>${cadastro.email}</td>
            <td>${cadastro.telefone}</td>
            <td>${cadastro.endereco}</td>
            <td>${cadastro.vaga}</td>
            <td>
                <button class="btn-edit" id='editar' onClick='cadastro.edita(${JSON.stringify(cadastro)})'>✏️</button>
                <button class="btn-edit" id='remover' onClick='cadastro.remove(${cadastro.codigo})'>🗑️</button>
            </td>
            </tr>
            `
        ))
        return (`<table border='1' class='paleBlueRows'>
        <caption>Dados Salvos!</caption>
        <thead>
            <th>Código</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Vaga desejada</th>
            <th>Opções</th>
            </thead>
            <tbody>${listagem}</tbody>
            </table>
        `)
    }
    atualiza() {
        document.getElementById('listagem').innerHTML = cadastro.tabela()
    }
}

const cadastro = new Formulario()

document.getElementById('enviar').onclick = function() {
    const reg = {
        codigo: document.getElementById('codigo').value,
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        endereco: document.getElementById('endereco').value,
        vaga: document.getElementById('vaga').value
    }
    cadastro.salva(reg)
}
window.onload = function () {
    cadastro.atualiza()
}