package app.controllers;

import io.javalin.Javalin;

public class PageController {
    public static void addRoutes(Javalin app) {
        app.get("/", ctx -> ctx.render("frontpage.html"));
        app.get("/frontpage", ctx -> ctx.render("frontpage.html"));
        app.get("/login", ctx -> ctx.render("login.html"));
    }
}