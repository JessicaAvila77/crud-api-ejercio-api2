import axios from "axios";
import { useState } from "react";
import {alertaError, alertaSuccess, alertaWarning} from "../alertas"
import Swal from "sweetalert2";


const useProducto = () =>{

    const [products, setProducts] = useState([])
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [titleModal, setTitleModal] = useState('')
    const [operation, setOperation] = useState(1)
    
    const url = 'https://api.escuelajs.co/api/v1/categories'

    const getProductos = async () => {
        const response = await axios.get(url)
        setProducts(response.data)
    }

    const openModal = (operation, id, name, image) => {
        setId('')
        setName('')
        setImage('')

        if (operation === 1) {
            setTitleModal('Registrar Producto')
            setOperation(1)
        } else if(operation === 2) {
            setTitleModal('Editar Producto')
            setOperation(2)
            setId(id)
            setName(name)
            setImage(image)
        }
    }

    const enviarSolicitud = async (urlApi, metodo, parametros = {}) => {
        let obj = {
            method: metodo,
            url: urlApi,
            data: parametros,
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        }

        await axios(obj).then(() => {
            let mensaje

            if (metodo === 'POST') {
                mensaje = 'Se guardó el producto'
            } else if (metodo === 'PUT') {
                mensaje = 'Se editó el producto'
            } else if (metodo === 'DELETE') {
                mensaje = 'Se eliminó el producto'
            }
            alertaSuccess(mensaje)
            document.getElementById('btnCerrarModal').click()
            getProductos()
        }).catch((error) => {
            alertaError(error.response.data.message)
        })
    }

    //validaciones
    const guardarEditarProducto = () => {
        let payload, metodo, urlAxios

        if (name === '') {
            alertaWarning('Nombre en blanco', 'name')
        } else if (image === '') {
            alertaWarning('Imagen en blanco', 'image')
        }else {
            payload = {
                name:name,
                image: image,
                
            }
    
            if (operation === 1) {
                metodo = 'POST'
                urlAxios = url
            } else {
                metodo = 'PUT'
                urlAxios = `${url}/${id}`
            }
    
            enviarSolicitud(urlAxios, metodo, payload)
        }

    }

    const deleteProducto = (id) => {
        Swal.fire({
            title: '¿Está seguro de eliminar el producto?',
            icon: 'question',
            text: 'No habrá marcha atrás',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setId(id)
                enviarSolicitud(`${url}/${id}`, 'DELETE')
            }
        }).catch((error) => {
            alertaError(error)
        })
    }





    return {
        products,
        getProductos,
        titleModal,
        setTitleModal,
        id,
        setId,
        name,
        setName,
        image,
        setImage,   
        openModal,
        guardarEditarProducto,
        deleteProducto,



    }





}

export default useProducto