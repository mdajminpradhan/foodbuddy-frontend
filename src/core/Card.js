import React, { useState, useEffect } from 'react';
import ImageHelper from './helper/ImageHelper';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';
import { Fragment } from 'react';

const Card = ({
	product,
	addtoCart = true,
	removeFromCart = false,
	setReload = (f) => f,
	//   function(f){return f}
	reload = undefined
}) => {
	const [ redirect, setRedirect ] = useState(false);
	const [ count, setCount ] = useState(product.count);

	const cartTitle = product ? product.name : 'A photo from pexels';
	const cartDescrption = product ? product.description : 'Default description';
	const cartPrice = product ? product.price : 'DEFAULT';

	const addToCart = () => {
		addItemToCart(product, () => setRedirect(true));
	};

	const getARedirect = (redirect) => {
		if (redirect) {
			return <Redirect to="/cart" />;
		}
	};

	const showAddToCart = (addtoCart) => {
		return (
			addtoCart && (
				<button onClick={addToCart} className="btn btn-primary btn-sm rounded">
					Add to Cart
				</button>
			)
		);
	};

	const showRemoveFromCart = (removeFromCart) => {
		return (
			removeFromCart && (
				<button
					onClick={() => {
						removeItemFromCart(product._id);
						setReload(!reload);
					}}
					className="btn btn-danger btn-sm rounded"
				>
					Remove
				</button>
			)
		);
	};
	return (
		<Fragment>
			{/* <div className="card text-white bg-dark ">
				<div className="card-body p-0">
					{getARedirect(redirect)}
					<ImageHelper product={product} />
					<p className="lead bg-success font-weight-normal text-wrap">{cartTitle}</p>
					<p className="btn btn-success rounded  btn-sm px-4">$ {cartPrice}</p>
					<div className="row">
						<div className="col-12">{showAddToCart(addtoCart)}</div>
						<div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
					</div>
				</div>
			</div> */}

			<div className="card mb-3" style={{ width: '18rem' }}>
				<ImageHelper product={product} />
        {getARedirect(redirect)}
				<div
					className="card-body"
					
				>
					<h5 className="card-title text-left">{cartTitle}</h5>
					<p className="card-text text-left">Price - $ {cartPrice}</p>
          <div className="row">
						<div className="col-6">{showAddToCart(addtoCart)}</div>
						<div className="col-6">{showRemoveFromCart(removeFromCart)}</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Card;
