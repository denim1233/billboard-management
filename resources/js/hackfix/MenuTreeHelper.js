import jQuery from "jquery";

export function loadTree() {
    const trees = jQuery('[data-widget="treeview"]');

    if ("TreeView" in trees) trees.Treeview("init");
}
