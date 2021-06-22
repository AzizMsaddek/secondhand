import React, { Component } from 'react';
import Page from 'components/Page';
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Col,
	Form,
	FormGroup,
	Input,
	Label,
	Row,
} from 'reactstrap';

import SubCategoryController from '../../services/controllers/SubCategoryController';
import CategoryController from '../../services/controllers/CategoryController';

export default class AddSubCategory extends Component {
	constructor() {
		super();
		this.state = {
			title: '',
			description: '',
			cat: '',
			Categories: [],
			catErr: '',
			error: '',
		};
		this.SubCategoryController = new SubCategoryController();
		this.CategoryController = new CategoryController();
	}

	getAllCategories() {
		this.CategoryController.getAllCategory().then(res => {
			this.setState({ Categories: res.data.data });
		});
	}

	pushSubCat(id, data) {
		let data1 = { subcat: data };
		this.CategoryController.pushSubCat(id, data1).then(res => {
			console.log('pushSubCategory', res);
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		let data = {
			title: this.state.title,
			description: this.state.description,
		};
		if (this.state.cat !== '' && this.state.title !== '') {
			this.SubCategoryController.AddSubCategory(data).then(res => {
				console.log('response', res);
				if (res.data.statuts == 500) {
					this.setState({
						error: 'Cette sous-catégorie déja existe',
					});
				} else {
					this.pushSubCat(this.state.cat, res.data.data._id);
					window.location.href = '/category';
				}
			});
		} else if (this.state.title === '') {
			this.setState({ error: 'Veuillez remplir ce champ' });
		} else {
			this.setState({ catErr: 'Veuillez séléctionner une catégorie' });
		}
	}

	componentDidMount() {
		this.getAllCategories();
	}

	handleKeyPress = event => {
		if (event.key === 'Enter') {
			this.handleSubmit(event);
		}
	};

	render() {
		return (
			<Page>
				<Row>
					<Col xl={8} lg={12} md={12}>
						<Card>
							<CardHeader>Ajouter une sous-catégorie</CardHeader>
							<CardBody>
								<Form>
									<FormGroup row>
										<Label for="exampleName" sm={2}>
											Catégorie
										</Label>
										<Col sm={10}>
											<select
												name="select"
												className="form-control"
												onChange={e =>
													this.setState({
														cat: e.target.value,
													})
												}
											>
												<option>
													Choisir une catégorie
												</option>
												{this.state.Categories.map(
													cat => (
														<option value={cat._id}>
															{cat.title}
														</option>
													),
												)}
											</select>
											<Label
												style={{
													// paddingBottom: '20px',
													fontSize: 12,
													color: 'red',
												}}
											>
												{this.state.catErr}
											</Label>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label for="exampleName" sm={2}>
											Title
										</Label>
										<Col sm={10}>
											<Input
												onKeyPress={this.handleKeyPress}
												type="text"
												name="name"
												placeholder="Titre"
												onChange={event =>
													this.setState({
														title: event.target
															.value,
													})
												}
											/>
											<Label
												style={{
													// paddingBottom: '20px',
													fontSize: 12,
													color: 'red',
												}}
											>
												{this.state.error}
											</Label>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label for="exampleEmail" sm={2}>
											Description
										</Label>
										<Col sm={10}>
											<Input
												onKeyPress={this.handleKeyPress}
												type="textarea"
												name="email"
												placeholder="Description (optionnel)"
												onChange={event =>
													this.setState({
														description:
															event.target.value,
													})
												}
											/>
										</Col>
									</FormGroup>
									<FormGroup check row>
										<Col sm={{ size: 10, offset: 2 }}>
											<Button
												onClick={event => {
													this.handleSubmit(event);
												}}
											>
												Ajouter
											</Button>
										</Col>
									</FormGroup>
								</Form>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Page>
		);
	}
}
