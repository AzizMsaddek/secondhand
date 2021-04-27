import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import compose from 'recompose/compose';

import Card from 'react-bootstrap/Card';

import avatar from '../../../assets/images/default-avatar.png';

import AnnonceController from '../../../services/controllers/AnnonceController';

class SpecialProducts extends Component {
	constructor() {
		super();
		this.state = {
			PROD: [],
		};
		this.AnnonceController = new AnnonceController();
	}

	componentDidMount() {
		this.AnnonceController.getAll().then((res) => {
			this.setState({ PROD: res.data.data });
			console.log('PRODUCT_DATA', this.state.PROD);
		});
	}

	annonceClick = (id) => {
		const { history } = this.props;
		history.push(`/product/${id}`);
	};

	render() {
		return (
			<div>
				<div id="card-container">
					{this.state.PROD.map((annonce) => {
						return (
							<Card
								id="card-style"
								
							>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										marginBottom: '10px',
									}}
								>
									{annonce.user_id.image ? (
										<img
											src={`http://localhost:4000/user/userimage/${
												annonce.user_id.image
											}`}
											// onClick={() => this.profil()}
											alt="avatar"
											width="32px"
											height="32px"
											style={{
												cursor: 'pointer',
												borderRadius: '50%',
												objectFit: 'cover',
												marginRight: '5px',
											}}
										/>
									) : (
										<img
											src={avatar}
											// onClick={() => this.profil()}
											alt="avatar"
											width="32px"
											height="32px"
											style={{
												cursor: 'pointer',
												borderRadius: '50%',
												objectFit: 'cover',
												marginRight: '5px',
											}}
										/>
									)}

									<Card.Text style={{ fontSize: '14px' }}>
										{annonce.user_id.name} {annonce.user_id.surName}
									</Card.Text>
								</div>
								<Card.Img
									style={{ width: '235px', height: '355px' }}
									variant="bottom"
									src={`http://localhost:4000/annonce/annonceImage/${
										annonce.image[0].name
									}`}
									onClick={() => this.annonceClick(annonce._id)}
								/>
								<Card.Body onClick={() => this.annonceClick(annonce._id)}>
									<Card.Title
										style={{
											fontWeight: '700',
											fontSize: '16px',
											marginTop: '-5px',
										}}
									>
										{annonce.title}
									</Card.Title>
									<Card.Title style={{ fontSize: '14px', marginTop: '-10px' }}>
										{annonce.price} DT
									</Card.Title>

									<Card.Text style={{ fontSize: '14px', marginTop: '-5px' }}>
										{annonce.date}
									</Card.Text>
								</Card.Body>
							</Card>
							
						);
					})}
				</div>
			</div>
		);
	}
}

export default compose(withRouter)(SpecialProducts);
