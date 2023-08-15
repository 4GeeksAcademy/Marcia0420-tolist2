import React, { useState, useEffect } from "react";


//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [tarea, setTarea] = useState("")
	const [lista, setLista] = useState([])

	useEffect(() => {
		// crearUsuario()
		obtenerLista()
	}, [])

	useEffect(() => {
		actualizarLista()
	}, [lista])

	function envioTarea(e) {
		e.preventDefault()
		setLista([...lista, { "label": tarea, "done": false }])
		setTarea("")
	}

	function eliminar(id) {
		let nuevasTareas = []
		nuevasTareas = lista.filter((item, index) => {
			if (index !== id) {
				return item
			}
		})
		setLista(nuevasTareas)
	}


	//crear usuario//
	const crearUsuario = async () => {
		const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/marcias", {
			method: "POST",
			body: JSON.stringify([]),
			headers: { "Content-Type": "application/json" }
		})
		const data = await response.json()
		console.log(data)
	}

	// obtener lista de tareas
	const obtenerLista = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/marcias")
			const data = await response.json()
			console.log(data)
			setLista(data)
		} catch (error) {
			console.log(error)
		}
	}

	//actualizar lista de tareas
	const actualizarLista = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/marcias", {
				method: "PUT",
				body: JSON.stringify(lista),
				headers: { "Content-Type": "application/json" }
			})
			const data = await response.json()
			console.log(data)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="text-center container">
			<h1 className="text-center mt-5">to do list!</h1>


			<div className="mb-3">
				<label htmlFor="exampleInputEmail1" className="form-label">tareas</label>
				<input type="text"
					className="form-control"
					id="exampleInputEmail1"
					aria-describedby="emailHelp"
					value={tarea}
					onChange={(e) => setTarea(e.target.value)}
				/>
				<br />
				<button className="btn btn-success"
					style={{ marginBottom: "30px" }}
					onClick={(e) => envioTarea(e)}> agregar tarea</button>
				<br />
				<ul className="list-group">
					{lista.map((item, id) => (
						<li className="list-group-item" key={id}>
							{item.label}
							<button className="btn btn-outline-success float-end"
								onClick={() => eliminar(id)}>
								X
							</button>
						</li>
					))}
				</ul>
			</div>
			{lista.length} tareas faltantes
		</div>
	);
};

export default Home;
