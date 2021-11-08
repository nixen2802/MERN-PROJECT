import "./Home.css";
import { Link } from "react-router-dom";
import img1 from "./img/team/team-1.jpg";
import img2 from "./img/team/team-2.jpg";
import img3 from "./img/team/team-3.jpg";
function Home() {
	return (
		// <div>
		// 	<h1>Welcome to HRN Industries!!!</h1>
		// 	<Link to={"/register"}>
		// 		<button className="btn btn-outline-secondary">Register</button>
		// 	</Link>
		// 	<Link to={"/login"}>
		// 		<button className="btn btn-outline-secondary">Login</button>
		// 	</Link>
		// </div>
		<div>
			<header id="header" class="fixed-top d-flex align-items-center">
				<div
					class="
					container
					d-flex
					align-items-center
					justify-content-between
				"
				>
					<h1 class="logo">
						<a href="#">HSN</a>
					</h1>

					<nav id="navbar" class="navbar">
						<ul>
							<li>
								<a
									class="nav-link scrollto active"
									href="#hero"
								>
									Home
								</a>
							</li>
							<li>
								<a class="nav-link scrollto" href="#about">
									About
								</a>
							</li>
							<li>
								<a class="nav-link scrollto" href="#team">
									Team
								</a>
							</li>
							<li>
								<a class="nav-link scrollto" href="#contact">
									Contact
								</a>
							</li>
						</ul>
						<i class="bi bi-list mobile-nav-toggle"></i>
					</nav>
				</div>
			</header>
			<section
				id="hero"
				class="d-flex justify-cntent-center align-items-center"
			>
				<div
					id="heroCarousel"
					data-bs-interval="5000"
					class="container carousel carousel-fade"
					data-bs-ride="carousel"
				>
					<div class="carousel-item active">
						<div class="carousel-container">
							<h2 class="animate__animated animate__fadeInDown">
								Welcome to <span>HSN</span>
							</h2>
							<p class="animate__animated animate__fadeInUp">
								Ut velit est quam dolor ad a aliquid qui
								aliquid. Sequi ea ut et est quaerat sequi nihil
								ut aliquam. Occaecati alias dolorem mollitia ut.
								Similique ea voluptatem. Esse doloremque
								accusamus repellendus deleniti vel. Minus et
								tempore modi architecto.
							</p>
							<div>
								<Link
									href="#about"
									class="
									btn-get-started
									animate__animated animate__fadeInUp
									scrollto
								"
									to={"/register"}
								>
									Register
								</Link>
								<Link
									href="#about"
									class="
								btn-get-started
								animate__animated animate__fadeInUp
								scrollto
							"
									to={"/login"}
								>
									Login
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			<main id="main">
				<section id="icon-boxes" class="icon-boxes">
					<div class="container">
						<div class="row">
							<div
								class="
								col-md-6 col-lg-3
								d-flex
								align-items-stretch
								mb-5 mb-lg-0
							"
								data-aos="fade-up"
							>
								<div class="icon-box">
									<div class="icon">
										<i class="bx bxl-dribbble"></i>
									</div>
									<h4 class="title">
										<a href="">Lorem Ipsum</a>
									</h4>
									<p class="description">
										Voluptatum deleniti atque corrupti quos
										dolores et quas molestias excepturi sint
										occaecati cupiditate non provident
									</p>
								</div>
							</div>

							<div
								class="
								col-md-6 col-lg-3
								d-flex
								align-items-stretch
								mb-5 mb-lg-0
							"
								data-aos="fade-up"
								data-aos-delay="100"
							>
								<div class="icon-box">
									<div class="icon">
										<i class="bx bx-file"></i>
									</div>
									<h4 class="title">
										<a href="">Sed ut perspiciatis</a>
									</h4>
									<p class="description">
										Duis aute irure dolor in reprehenderit
										in voluptate velit esse cillum dolore eu
										fugiat nulla pariatur
									</p>
								</div>
							</div>

							<div
								class="
								col-md-6 col-lg-3
								d-flex
								align-items-stretch
								mb-5 mb-lg-0
							"
								data-aos="fade-up"
								data-aos-delay="200"
							>
								<div class="icon-box">
									<div class="icon">
										<i class="bx bx-tachometer"></i>
									</div>
									<h4 class="title">
										<a href="">Magni Dolores</a>
									</h4>
									<p class="description">
										Excepteur sint occaecat cupidatat non
										proident, sunt in culpa qui officia
										deserunt mollit anim id est laborum
									</p>
								</div>
							</div>

							<div
								class="
								col-md-6 col-lg-3
								d-flex
								align-items-stretch
								mb-5 mb-lg-0
							"
								data-aos="fade-up"
								data-aos-delay="300"
							>
								<div class="icon-box">
									<div class="icon">
										<i class="bx bx-layer"></i>
									</div>
									<h4 class="title">
										<a href="">Nemo Enim</a>
									</h4>
									<p class="description">
										At vero eos et accusamus et iusto odio
										dignissimos ducimus qui blanditiis
										praesentium voluptatum deleniti atque
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section id="team" class="team section-bg">
					<div class="container" data-aos="fade-up">
						<div class="section-title">
							<h2>Team</h2>
							<p>
								Magnam dolores commodi suscipit. Necessitatibus
								eius consequatur ex aliquid fuga eum quidem. Sit
								sint consectetur velit. Quisquam quos quisquam
								cupiditate. Et nemo qui impedit suscipit alias
								ea. Quia fugiat sit in iste officiis commodi
								quidem hic quas.
							</p>
						</div>

						<div class="row">
							<div
								class="col-lg-6"
								data-aos="fade-up"
								data-aos-delay="100"
							>
								<div class="member d-flex align-items-start">
									<div class="pic">
										<img
											src={img1}
											class="img-fluid"
											alt=""
										/>
									</div>
									<div class="member-info">
										<h4>Hussein Motiwala</h4>
										<span>Full Stack Developer</span>
										<p>
											Explicabo voluptatem mollitia et
											repellat qui dolorum quasi
										</p>
										<div class="social">
											<a href="">
												<i class="ri-twitter-fill"></i>
											</a>
											<a href="">
												<i class="ri-facebook-fill"></i>
											</a>
											<a href="">
												<i class="ri-instagram-fill"></i>
											</a>
											<a href="">
												<i class="ri-linkedin-box-fill"></i>
											</a>
										</div>
									</div>
								</div>
							</div>

							<div
								class="col-lg-6 mt-4 mt-lg-0"
								data-aos="fade-up"
								data-aos-delay="200"
							>
								<div class="member d-flex align-items-start">
									<div class="pic">
										<img
											src={img2}
											class="img-fluid"
											alt=""
										/>
									</div>
									<div class="member-info">
										<h4>Nayan Mandliya</h4>
										<span>Full Stack Developer</span>
										<p>
											Aut maiores voluptates amet et quis
											praesentium qui senda para
										</p>
										<div class="social">
											<a href="">
												<i class="ri-twitter-fill"></i>
											</a>
											<a href="">
												<i class="ri-facebook-fill"></i>
											</a>
											<a href="">
												<i class="ri-instagram-fill"></i>
											</a>
											<a href="">
												<i class="ri-linkedin-box-fill"></i>
											</a>
										</div>
									</div>
								</div>
							</div>

							<div
								class="col-lg-12 mt-4"
								data-aos="fade-up"
								data-aos-delay="300"
							>
								<div class="member d-flex align-items-start">
									<div class="pic">
										<img
											src={img3}
											class="img-fluid"
											alt=""
										/>
									</div>
									<div class="member-info">
										<h4>Rushabh Gandhi</h4>
										<span>Full Stack Developer</span>
										<p>
											Quisquam facilis cum velit laborum
											corrupti fuga rerum quia
										</p>
										<div class="social">
											<a href="">
												<i class="ri-twitter-fill"></i>
											</a>
											<a href="">
												<i class="ri-facebook-fill"></i>
											</a>
											<a href="">
												<i class="ri-instagram-fill"></i>
											</a>
											<a href="">
												<i class="ri-linkedin-box-fill"></i>
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>

			<footer id="footer">
				<div class="container">
					<div class="copyright">
						&copy; Copyright{" "}
						<strong>
							<span>HSN</span>
						</strong>
						. All Rights Reserved
					</div>
					<div class="credits">
						Designed by
						<a href="#">Rushabh, Nayan, Hussein</a>
					</div>
				</div>
			</footer>

			<div id="preloader"></div>
			<a
				href="#"
				class="back-to-top d-flex align-items-center justify-content-center"
			>
				<i class="bi bi-arrow-up-short"></i>
			</a>

			<script src="assets/vendor/aos/aos.js"></script>
			<script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
			<script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
			<script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
			<script src="assets/vendor/php-email-form/validate.js"></script>
			<script src="assets/vendor/swiper/swiper-bundle.min.js"></script>

			<script src="assets/js/main.js"></script>
		</div>
	);
}
export default Home;
