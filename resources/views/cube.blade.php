<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css">
    <script src="https://code.createjs.com/createjs-2015.11.26.min.js"></script>
    <script src="https://code.createjs.com/easeljs-0.8.2.min.js"></script>
    <script src="https://code.createjs.com/tweenjs-0.6.2.min.js"></script>

    <title>Hello, world!</title>

  </head>
  <body class="text-center" onload="init();">

    <!--nav class="navbar navbar-dark navbar-expand-lg navbar-light bg-light"-->

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#">Cube</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExample07">
          <ul class="navbar-nav mr-auto">

            <li class="nav-item active dropdown">
              <!--a class="nav-link" href="#">Player: <span class="sr-only">(current)</span></a-->
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Player: Guest12343231
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <div style="margin:10px;">
                <form class="form-inline">
                  <input class="form-control" type="search" placeholder="Guest12343231" aria-label="Search" style="margin-bottom:10px;">
                  <button class="btn btn-outline-success" type="submit" style="margin-bottom:10px;">Change</button>
                </form>

                <div class="dropdown-divider"></div>
                <label>Last play: 03-02-1018</label>
                </div>
              </div>
            </li>

            <li class="nav-item active">
              <a class="nav-link" href="#" href="#">Level: 5<span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item active dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-toggle="dropdown">Map:</a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown2">
                <div style="margin:10px;">
                  <label>Map:</label>
                </div>
              </div>
            </li>
          </ul>

        </div>
      </div>
    </nav>

    <main role="main" class="inner cover">
      <canvas id="thisCanvas" width="320" height="350"></canvas>
      <!--h1 class="cover-heading">Cover your page.</h1>
      <p class="lead">Cover is a one-page template for building simple and beautiful home pages. Download, edit the text, and add your own fullscreen background photo to make it your own.</p>
      <p class="lead">
        <a href="#" class="btn btn-lg btn-secondary">Learn more</a>
      </p-->
    </main>


    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <script src="js/cube.js"></script>
  </body>
</html>