import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { UserFormComponent } from "./user-form/user-form.component";
import { UserInfoTableComponent } from "./user-info-table/user-info-table.component";
import {Routes, RouterModule} from "@angular/router";

const routes: Routes = [
    {path: 'user-form', component: UserFormComponent},
    {path: 'user-info-table', component: UserInfoTableComponent}
]

@NgModule({
    imports: [BrowserModule, RouterModule.forRoot(routes, {useHash: true})],
    exports: [],
})

export class AppRoutingModule {}