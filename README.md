<!-- HEADER -->
<br />
<p align="center">

  <h3 align="center">Recipe Store</h3>

  <p align="center">
    A small services for storing recipes!
    <br />
    <a href="TODO">Report Bug</a>
    <a href="TODO">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

To combine two of my hobbies I decided to build a small service relating to recipes. This is a small RESTful service for persisting recipes in MongoDB. The aims of this project were:

-   Simple way of storing recipes
-   Able to easily view all the recipes I have stored
-   Light weight (deployment was on a Raspberry Pi)

### Built With

-   [TypeScript](https://www.typescriptlang.org/)
-   [Express](https://expressjs.com/)
-   [Mongoose](https://mongoosejs.com/)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

-   [node.js](https://nodejs.org/en/)
-   [docker](https://www.docker.com/get-started)

```sh
docker pull mongo
docker run --name mongo -p 27017:27017 mongo
```

### Installation

1. Clone the repo
    ```sh
    git clone https://github.com/your_username_/Project-Name.git
    ```
2. Install NPM packages
    ```sh
    npm install
    ```
3. Compile the JavaScript
    ```sh
    npm run build
    ```
4. Ensure the `.env` file is pointing at your local MongoDB (mongodb://localhost:27017/recipe)
5. Start the service
    ```sh
    npm start
    ```

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/battmeech/recipe-api/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
2. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the Branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Matt Beech - matthew_beech@live.co.uk

Project Link: [https://github.com/battmeech/recipe-api](https://github.com/battmeech/recipe-api)
