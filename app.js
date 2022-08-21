//POO DEFINITIONS

class Product {
    constructor({
        name,
        price,
        year
    }){
        this.name=name;
        this.price=price;
        this.year=year;
    }
}

class UserInterface {
    addProduct(product){
        const productList = document.querySelector("#product-list");
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Producto</strong>: ${product.name} 
                    <strong>Precio del producto</strong>: ${product.price} 
                    <strong>Año</strong>: ${product.year} 
                    <a href="#" class="btn btn-danger ms-2 rounded"><i class="fa-solid fa-eraser"></i></a>
                </div>
            </div>
        `;
        productList.appendChild(element);
    }

    resetForm(){
        const productForm = document.querySelector("#product-form");
        productForm.reset();
    }

    deleteProduct(element){

        const elementTag = element.tagName;
        if(elementTag === 'I'){
            element.parentElement.parentElement.parentElement.parentElement.remove();
        }
    }

    showMessage({message,code}){

        if(message==='Falta información por agregar'){

            const myModal = document.getElementById('alertModal');
        
            const messageTitle = document.querySelector('.modal-title');
            messageTitle.className = `text-${code}`;
            messageTitle.appendChild(document.createTextNode("Alerta"));

            const messageBody = document.querySelector('.modal-message');
            messageBody.appendChild(document.createTextNode(message));

            const modal = bootstrap.Modal.getOrCreateInstance(myModal)
            modal.show();

        }else{

            const div  = document.createElement('div');
            div.className = `alert alert-${code} mt-5 text-center`; 
            div.appendChild(document.createTextNode(message));
            //SHOWING IN THE DOM
            const container = document.querySelector(".container");
            const app = document.querySelector('#app');
            container.insertBefore(div,app);
            setTimeout(function(){
                document.querySelector('.alert').remove();
            },3000);
        
        }
    }


}

//DOM EVENTS
const form = document.querySelector("#product-form");
form.addEventListener('submit',formSubmitFunction);

function formSubmitFunction(e){

    const name = document.querySelector("#name").value;
    const price = document.querySelector("#price").value;
    const year = document.querySelector("#year").value;
    
    const product = new Product({name,price,year});
    
    const interface = new UserInterface();

    if(name === '' || price === '' || year === ''){
        interface.showMessage({message: 'Falta información por agregar',code: 'danger'});    
    }else{
        interface.addProduct(product);
        interface.showMessage({message: 'Producto agregado satisfactoriamente',code: 'success'});
        interface.resetForm();
    }

    e.preventDefault();

}


const deleteItem = document.querySelector("#product-list");
deleteItem.addEventListener('click',deleteItemFunction);

function deleteItemFunction(e) {
    const interface = new UserInterface();
    interface.deleteProduct(e.target);
    interface.showMessage({message: 'Producto eliminado satisfactoriamente',code: 'danger'});
}
