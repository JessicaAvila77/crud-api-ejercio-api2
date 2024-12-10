import Campo from "./Campo"
import { useEffect } from "react"
import useProducto from "../hooks/useProducto"

const Producto = ()=>{
    const {
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

    } = useProducto()

    useEffect(() => {
        getProductos()
       
    }, [])

    return(

        <div className="container-fluid">
            <div className="row mt-3">
                <div className="col-md-4 offset-md-4">
                    <div className="d-grid mx-auto">
                        <button onClick={()=> openModal(1)}  className="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalProducto">
                            Crear Producto
                        </button>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                    <div className="table-responsive">
                        <table className="table table-bordered ">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {
                                    products.map((product, i) =>(
                                        <tr key={product.id}>
                                            <td>{i + 1}</td>                                          
                                            <td>{product.name}</td>                                        
                                            <td>{product.image}</td>
                                            <td>
                                                <button onClick={()=> openModal(2, product.id, product.name, product.image )} className="btn btn-warning" data-bs-toggle='modal' data-bs-target='#modalProducto'>
                                                    <i className="fa-solid fa-edit" />
                                                </button>
                                                <button onClick={()=> deleteProducto(product.id)}className="btn btn-danger" >
                                                <i className="fa-solid fa-trash" />
                                                </button>
                                            </td>
                                        
                                        
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>    

            <div id='modalProducto' className="modal fade" aria-hidden='true'>

                <div className="modal-dialog">
                    <div className="modal-content">
                        
                        <div className="modal-header">
                            <label className="h5">{titleModal}</label>
                            <button className="btn-close" data-bs-dismiss="modal" aria-label="close" />
                        </div>

                        <div className="modal-body">
                            <input type="hidden" id='id'  />
                            
                          
                            <Campo idCampo='name' iconName='fa-solid fa-gift' placeholderName="nombre" tipoCampo="text" value={name} onChange={(e) => setName(e.target.value)}/>
                           
                            <Campo idCampo='image' iconName='fa-solid fa-gift' placeholderName="image" tipoCampo="url" value={image} onChange={(e) => setImage(e.target.value)}/>
                            
                        </div>

                        <div className="modal-footer">
                            <button onClick={()=>guardarEditarProducto()} className="btn btn-success">
                                <i className="fa-solid fa-floppy-disk"/> Guardar
                            </button>
                            <button id="btnCerrarModal" className="btn btn-danger"
                                data-bs-dismiss='modal'> Cerrar
                            </button>

                        </div>

                    </div> 

                                      
                </div>
       
            </div>







        </div>





    )












}

export default Producto
