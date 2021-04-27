import React, { Component } from 'react';

import { toast } from 'react-toastify';

import Select from '@material-ui/core/Select';

import Breadcrumb from '../common/breadcrumb';

import ImageUploader from 'react-images-upload';

import UserController from '../../services/controllers/userControllers';
import CategoryController from '../../services/controllers/CategoryController';
import SubCategoryController from '../../services/controllers/SubCategoryController';
import AnnonceController from '../../services/controllers/AnnonceController';

// import SubCategoryController from '../../services/controllers/SubCategoryController';

class Deposer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			description: '',
			price: '',
			tel: '',
			subCat_id: '',
			user_id: '',
			Categories: [],
			pictures: [],
			error: {},
		};
		this.UserController = new UserController();
		this.CategoryController = new CategoryController();
		this.SubCategoryController = new SubCategoryController();
		this.AnnonceController = new AnnonceController();

		this.onDrop = this.onDrop.bind(this);
	}

	componentDidMount() {
		if (localStorage.getItem('userId')) {
			this.setState({ user_id: localStorage.getItem('userId') });
			console.log('user id:', localStorage.getItem('userId'));
			this.getUser(localStorage.getItem('userId'));
		}
		this.getAllCategories();
	}

	pushAnnonceUser(id, data) {
		let data1 = { annonce: data };
		this.UserController.pushAnnonce(id, data1).then((res) => {
			console.log('pushAnnonce', res);
		});
	}

	pushAnnonceSubCat(id, data) {
		let data1 = { annonce: data };
		this.SubCategoryController.pushAnnonce(id, data1).then((res) => {
			console.log('pushAnnonce', res);
		});
	}

	getUser(id) {
		this.UserController.getUser(id).then((res) => {
			this.setState({ tel: res.data.data.tel });
		});
	}

	getAllCategories() {
		this.CategoryController.getAllCategory().then((res) => {
			this.setState({ Categories: res.data.data });
		});
	}

	onDrop(pictureFiles, pictureDataURLs) {
		this.setState({
			pictures: pictureFiles,
		});
	}

	validate = () => {
		let isError = false;
		const errors = {
			titleErr: '',
			priceErr: '',
			telErr: '',
			catErr: '',
			picErr: '',
		};

		if (this.state.title === '') {
			isError = true;
			errors.titleErr = 'Veuillez vérifier le titre';
		}
		if (this.state.price === '') {
			isError = true;
			errors.priceErr = 'Veuillez entrer le prix';
		}
		if (
			isNaN(this.state.tel) ||
			this.state.tel.length < 8 ||
			this.state.tel.length > 8
		) {
			isError = true;
			errors.telErr = 'Veuillez vérifier votre numéro';
		}
		if (this.state.subCat_id === '') {
			isError = true;
			errors.catErr = 'Veuillez séléctionner la catgéorie';
		}
		if (this.state.pictures.length === 0) {
			isError = true;
			errors.picErr = 'Veuillez ajouter au moins une image';
		}
		if (this.state.pictures.length > 5) {
			isError = true;
			errors.picErr = 'Veuillez ajouter 5 images au maximum';
		}

		this.setState({
			error: errors,
		});
		return isError;
	};

	getFormData(object) {
		const formData = new FormData();
		Object.keys(object).forEach((key) => formData.append(key, object[key]));
		return formData;
	}

	handleSubmit(event) {
		let err = this.validate();
		const formData = new FormData();

		formData.append('title', this.state.title);
		for (var i = 0; i < this.state.pictures.length; i++) {
			formData.append('image', this.state.pictures[i]);
		}
		formData.append('user_id', this.state.user_id);
		formData.append('description', this.state.description);
		formData.append('price', this.state.price);
		formData.append('subCat_id', this.state.subCat_id);

		if (!err) {
			this.AnnonceController.addAnnonce(formData).then((res) => {
				console.log('response', res);
				this.pushAnnonceUser(this.state.user_id, res.data.data._id);
				this.pushAnnonceSubCat(this.state.subCat_id, res.data.data._id);
				this.props.history.push('/');
				toast.success('Annonce créée');
			});
		}

		// // window.location.href = '/';
	}

	render() {
		return (
			<div>
				<Breadcrumb title={'Annonce'} />

				{/*Regsiter section*/}
				<section className="register-page section-b-space">
					<div className="container">
						<div className="row">
							<div className="col-lg-12">
								<h3>Déposer votre annonce</h3>
								<div className="theme-card">
									<form className="theme-form">
										<div className="form-row">
											<div className="col-md-6">
												<label>Titre</label>
												<input
													name="name"
													type="text"
													maxLength="20"
													className="form-control"
													id="fname"
													onChange={(e) => {
														this.setState({ title: e.target.value });
													}}
												/>
												<label
													style={{
														paddingBottom: '20px',
														fontSize: 12,
														color: 'red',
													}}
												>
													{this.state.error.titleErr}
												</label>
											</div>

											<div className="col-md-6">
												<label htmlFor="review">Prix</label>
												<input
													name="price"
													type="number"
													className="form-control"
													id="lname"
													onChange={(e) => {
														this.setState({ price: e.target.value });
													}}
												/>
												<label
													style={{
														paddingBottom: '20px',
														fontSize: 12,
														color: 'red',
														marginTop: -20,
													}}
												>
													{this.state.error.priceErr}
												</label>
											</div>
										</div>
										<div className="form-row">
											<div className="col-md-6">
												<label htmlFor="email">Description (optionnelle)</label>
												<br />
												<textarea
													className="form-control"
													style={{ resize: 'none' }}
													name="Description"
													rows="5"
													cols="93"
													onChange={(e) => {
														this.setState({ description: e.target.value });
													}}
												/>

												<label
													style={{
														paddingBottom: '20px',
														fontSize: 12,
														color: 'red',
													}}
												/>
											</div>
											<div className="col-md-6">
												<label htmlFor="review">Numéro de téléphone</label>
												<input
													defaultValue={this.state.tel}
													name="tel"
													maxLength={8}
													type="tel"
													className="form-control"
													id="lname"
													placeholder="Votre numéro"
													onChange={(e) => {
														this.setState({ tel: e.target.value });
													}}
												/>
												<label
													style={{
														paddingBottom: '20px',
														fontSize: 12,
														color: 'red',
														marginTop: -20,
													}}
												>
													{this.state.error.telErr}
												</label>
											</div>
											<div className="col-md-6">
												<label htmlFor="review">Catégorie</label>
												<br />
												<Select
													native
													onChange={(e) =>
														this.setState({
															subCat_id: e.target.value,
														})
													}
												>
													<option
														aria-label="None"
														value="Choisir une catégorie"
													/>
													{this.state.Categories.map((cat, index) => {
														return (
															<>
																<optgroup label={cat.title}>
																	{this.state.Categories[index].subcat.map(
																		(subcat) => (
																			<option value={subcat._id}>
																				{subcat.title}
																			</option>
																		)
																	)}
																</optgroup>
															</>
														);
													})}
												</Select>
												<br />
												<br />
												<label
													style={{
														paddingBottom: '20px',
														fontSize: 12,
														color: 'red',
													}}
												>
													{this.state.error.catErr}
												</label>
												<br /> <br /> <br />
												<br />
											</div>

											<div className="col-md-6">
												<ImageUploader
													withIcon={true}
													withPreview
													buttonText="Choisir vos images (5 maximum)"
													onChange={this.onDrop}
													imgExtension={['.jpg', '.gif', '.png', '.gif']}
													maxFileSize={5242880}
													withLabel={false}
													fileSizeError="La taille des fichiers est trop large"
													fileTypeError="Le type de fichiers n'est pas supporté"
												/>
												<label
													style={{
														paddingBottom: '20px',
														fontSize: 12,
														color: 'red',
													}}
												>
													{this.state.error.picErr}
												</label>
											</div>
										</div>
										<a
											className="btn btn-solid"
											onClick={() => this.handleSubmit()}
										>
											Déposer
										</a>
									</form>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default Deposer;
