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

import CategoryController from '../../services/controllers/CategoryController';

export default class AddCategory extends Component {
	constructor() {
		super();
		this.state = {
			title: '',
			error: '',
			// description: '',
		};
		this.CategoryController = new CategoryController();
	}

	handleSubmit(event) {
		event.preventDefault();
		let data = {
			title: this.state.title,
			// description: this.state.description
		};
		if (this.state.title !== ''){
		this.CategoryController.AddCategory(data).then(res => {
			console.log('response', res);
			if (res.data.statuts == 500) {
				this.setState({
					error: 'Cette catégorie déja existe',
				});
			} else {
				window.location.href = '/category';
			}
		});
	}
	else {
		this.setState({error: 'Veuillez remplir ce champ'});
	}
	
	}

	render() {
		return (
			<Page>
				<Row>
					<Col xl={8} lg={12} md={12}>
						<Card>
							<CardHeader>Ajouter une catégorie</CardHeader>
							<CardBody>
								<Form>
									<FormGroup row>
										<Label for="exampleName" sm={2}>
											Titre
										</Label>
										<Col sm={10}>
											<Input
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
