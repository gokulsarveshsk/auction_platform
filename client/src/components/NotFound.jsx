import React from 'react';
import '../components/css/notfound.css';
import { Link } from 'react-router-dom';  // Import the CSS for styling

function Chatbot() {
    return (
        <div className="not-found">
            <section class="page_404">
	<div class="container">
		<div class="row">	
		<div class="col-sm-12 ">
		<div class="col-sm-10 col-sm-offset-1  text-center">
		<div class="four_zero_four_bg">
			<h1 class="text-center h11 ">404</h1>
		
		
		</div>
		
		<div class="contant_box_404">
		<h3 class="h2">
		Look like you're lost
		</h3>
		
		<p>the page you are looking for not available!</p>
		
        <Link to="/" className="link_404">
            Go to Home
        </Link>
	</div>
		</div>
		</div>
		</div>
	</div>
</section>
        </div>
    );
}

export default Chatbot;