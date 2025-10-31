package app.controllers;

import app.entities.*;
import app.persistence.BottomMapper;
import app.persistence.ToppingMapper;
import app.persistence.ConnectionPool;
import app.exceptions.DatabaseException;
import io.javalin.Javalin;
import io.javalin.http.Context;
import java.util.List;

public class OrderController {

    public static void addRoutes(Javalin app, ConnectionPool connectionPool) {

        app.get("/cupcakeria", ctx -> showCupcakeria(ctx, connectionPool));
        app.post("/add-to-cart", ctx -> addToCart(ctx, connectionPool));
        app.get("/cart", ctx -> showCart(ctx));
        app.get("/orderAcceptance", ctx -> {
            // Fjern kurv fra sessionen (tøm den)
            ctx.sessionAttribute("basket", null);

            // Send brugeren til en "ordre modtaget"-side
            ctx.render("orderAcceptance.html");
        });
    }

    // Viser alle toppings og bunde fra databasen
    private static void showCupcakeria(Context ctx, ConnectionPool connectionPool) {
        try {
            List<Topping> toppings = ToppingMapper.getAllToppings(connectionPool);
            List<Bottom> bottoms = BottomMapper.getAllBottoms(connectionPool);

            ctx.attribute("toppings", toppings);
            ctx.attribute("bottoms", bottoms);
            ctx.render("cupcakeria.html");

        } catch (DatabaseException e) {
            ctx.result("Fejl ved hentning af data: " + e.getMessage());
        }
    }

    // Tilføjer valgt cupcake til kurven (session)
    private static void addToCart(Context ctx, ConnectionPool connectionPool) {
        try {
            int toppingId = Integer.parseInt(ctx.formParam("toppingId"));
            int bottomId = Integer.parseInt(ctx.formParam("bottomId"));

            Topping topping = ToppingMapper.getToppingById(toppingId, connectionPool);
            Bottom bottom = BottomMapper.getBottomById(bottomId, connectionPool);

            // Lav en orderline (én cupcake)
            Orderline line = new Orderline(1, bottom, topping);

            // Find eller lav en ny kurv i sessionen
            Basket basket = ctx.sessionAttribute("basket");
            if (basket == null) basket = new Basket();

            basket.addOrderline(line);
            ctx.sessionAttribute("basket", basket);

            ctx.redirect("/cart");

        } catch (DatabaseException e) {
            ctx.result("Fejl i databasen: " + e.getMessage());
        } catch (NumberFormatException e) {
            ctx.result("Fejl: Kunne ikke læse topping/bund ID.");
        }
    }

    // Viser kurven
    private static void showCart(Context ctx) {
        Basket basket = ctx.sessionAttribute("basket");
        ctx.attribute("basket", basket);
        ctx.render("cart.html");
    }
}