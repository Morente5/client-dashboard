var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"ROUTES","file":"src/app/core/layout/layout-routing.module.ts","module":"LayoutRoutingModule","children":[{"path":"","component":"HomeComponent"},{"path":"tasks","loadChildren":"./../../routes/tasks/tasks.module#TasksModule","children":[{"kind":"module","children":[{"name":"routes","file":"src/app/routes/resources/resources-routing.module.ts","module":"TasksRoutingModule","children":[{"path":"","component":"ResourcesComponent"}],"kind":"module"}],"module":"TasksModule"}]},{"path":"social","loadChildren":"./../../routes/social/social.module#SocialModule","children":[{"kind":"module","children":[],"module":"SocialModule"}]},{"path":"resources","loadChildren":"./../../routes/resources/resources.module#ResourcesModule","children":[{"kind":"module","children":[],"module":"ResourcesModule"}]},{"path":"**","redirectTo":"","pathMatch":"full"}],"kind":"module"}]}
