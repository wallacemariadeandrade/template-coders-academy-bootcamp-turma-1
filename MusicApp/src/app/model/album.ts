// O Angular é capaz de fazer o binding das

import Music from './music';

// propriedades automaticamente!!
export default class Album {
    public id?: String;
    public name?:String;
    public description?:String;
    public backdrop?:String;
    public band?:String;
    public musics?:Music[]
}