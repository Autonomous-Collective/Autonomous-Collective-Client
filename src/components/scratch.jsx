<div className="flex-column">
      {message ? <MessageAlert message={message} isError={isError} /> : null}
      {product?.title ? (
        <>
          <div className="flex-row">
            <div id="single-prod-picture">
              <img
                src={product.img}
                alt="placeholder"
                height="500"
                width="450"
              ></img>
            </div>
            <div id="title-details">
              <h1>{product.title}</h1>
              <h3>By: {product.author}</h3>
              <p>{product.isbn}</p>
              <h4>${product.price / 100}</h4>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addProductToCart();
                }}
              >
                <label>choose the quantity</label>
                <input
                  type="number"
                  defaultValue={1}
                  min={1}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                />
                <button type="submit">add to cart</button>
              </form>
            </div>
          </div>
          <div className="flex-row">
            <div id="description">
              <p>{product.description}</p>
              <div id="product-tags-div">
                {product.tags?.length
                  ? product.tags.map((tag, idx) => {
                      return <p key={`${idx} tag list map`}>{tag}</p>;
                    })
                  : null}
              </div>
            </div>
            <div id="reviews">
              <button
                onClick={() => {
                  toggle();
                }}
              >
                Add a Reveiw
              </button>
              <div id="create-review">
                <CreateReview token={token} productId={product.id} />
              </div>
              <ReviewList productId={product.id} />
            </div>
          </div>
        </>
      ) : (
        <h1>LOAFING</h1>
      )}
    </div>
