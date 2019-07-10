class ProductList extends React.Component {

  constructor(props) {
    super(props); // this is just convention b/c we aren't actually using it

    this.state = {
      products: [], // initializing "empty" state is good practice
    };

    this.handleProductUpVote = this.handleProductUpVote.bind(this); // because we are using this for setState, we have to bind it to the component
  }

  componentDidMount() {
    this.setState({ products: Seed.products });
  }

  handleProductUpVote(productId) {
    const nextProducts = this.state.products.map((product) => { // traverse over the entire product array
      if (product.id === productId) { // if upvoted, create new object and overwrite votes property
        return Object.assign({}, product, {
          votes: product.votes +1,
        });
      } else {
        return product; // if not upvoted, just keep it as is
      }
    });
    this.setState({
      products: nextProducts,
    });
  }
  
  render() {
    const products = this.state.products.sort((a, b) => (
      b.votes - a.votes
      // if return is less than 0, a comes first
      // if return is greater than 0, b comes first
      // if return is equal to 0, leave order unchanged
    ));
    const productComponents = products.map((product) =>
      <Product
          key ={'product-' + product.id}
          id={product.id}
          title={product.title}
          description={product.description}
          url={product.url}
          votes={product.votes}
          submitterAvatarUrl={product.submitterAvatarUrl}
          productImageUrl={product.productImageUrl}
          onVote={this.handleProductUpVote} // this passes the handleProductUpVote as a prop, so we can access it via this.props.onVote
      />
    );
    return (
      <div className='ui unstackable items'>
        {productComponents}
      </div>
    );
  }
}

class Product extends React.Component {
  constructor(props) {
    super(props);

    this.handleUpVote = this.handleUpVote.bind(this);
  }
  
  handleUpVote() {
    this.props.onVote(this.props.id);
  }

  render() {
    return (
      <div className='item'>
        <div className="image">
          <img src={this.props.productImageUrl} />
        </div>
        <div className="middle aligned content">
          <div className="header">
            <a onClick={this.handleUpVote}>
              <i className="large caret up icon" />
            </a>
            {this.props.votes}
          </div>
          <div className="description">
            <a href={this.props.url}>
              {this.props.title}
            </a>
            <p>
              {this.props.description}
            </p>
          </div>
          <div className="extra">
            <span> Submitted by:</span>
            <img 
              className="ui avatar image"
              src={this.props.submitterAvatarUrl} 
            /> 
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <ProductList />,
  document.getElementById('content')
);
