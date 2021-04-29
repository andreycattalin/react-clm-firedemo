import { useEffect, useState } from 'react';
import './App.css';
import { firebase } from './firebase';

function App() {
	const [ cities, setCities ] = useState([]);
	const [ isLoading, setLoading ] = useState(false);

	const createData = () => {
		const db = firebase.firestore();
		db
			.collection('cities')
			.add({
				name: 'Sevilla 2',
				state: 'CA',
				country: 'USA'
			})
			.then(() => {
				console.log('Document successfully written!');
			})
			.catch((error) => {
				console.error('Error writing document: ', error);
			});
	};

	const updateData = () => {
		const db = firebase.firestore();
		db
			.collection('cities')
			.doc('LA')
			.update({
				name: 'Madrid'
			})
			.then(() => {
				console.log('Document successfully written!');
			})
			.catch((error) => {
				console.error('Error writing document: ', error);
			});
	};

	const deleteData = () => {
		const db = firebase.firestore();

		db
			.collection('cities')
			.doc('AkNZLhLkNqJUGANKgkc4')
			.delete()
			.then(() => {
				console.log('Document successfully deleted!');
			})
			.catch((error) => {
				console.error('Error removing document: ', error);
			});
	};

	const readAllData = () => {
		const db = firebase.firestore();
		db.collection('cities').onSnapshot((querySnapshot) => {
			let allCities = [];
			querySnapshot.forEach((doc) => {
				//console.log(doc.id, ' => ', doc.data());
				allCities.push(doc.data());
			});

			setCities(allCities);
		});
	};

	useEffect(() => {
		readAllData();
	}, []);

	const guardarDatos = (e) => {
		e.preventDefault();

		const newData = { name: e.target.city.value, state: e.target.state.value, country: e.target.country.value };
		const db = firebase.firestore();
		db
			.collection('cities')
			.add(newData)
			.then(() => {
				console.log('Document successfully written!');
			})
			.catch((error) => {
				console.error('Error writing document: ', error);
			});
		e.target.reset();
	};

	return (
		<div className="container mt-4">
			<div className="row">
				<div className="col-12">
					<h1>Hola baby</h1>

					{isLoading ? <p>Cargando...</p> : null}

					<ul className="list-group">
						{cities.map((city, i) => (
							<li key={i} className="list-group-item">
								{city.name}
							</li>
						))}
					</ul>

					<button type="button" onClick={readAllData} className="btn ms-2 btn-primary mt-4">
						Leer datos
					</button>

					<button type="button" onClick={createData} className="btn ms-2 btn-primary mt-4">
						Crear datos
					</button>

					<button type="button" onClick={updateData} className="btn ms-2 btn-primary mt-4">
						Actualizar datos
					</button>

					<button type="button" onClick={deleteData} className="btn ms-2 btn-primary mt-4">
						Eliminar datos
					</button>
				</div>

				<div className="col-12 mt-4">
					<form onSubmit={guardarDatos}>
						<input type="text" placeholder="Ingrese Ciudad" className="form-control mb-2" name="city" />
						<input type="text" placeholder="Ingrese Pais" className="form-control mb-2" name="country" />
						<input type="text" placeholder="Ingrese Estado" className="form-control mb-2" name="state" />
						<button className="btn btn-primary btn-block" type="submit">
							Agregar
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default App;
