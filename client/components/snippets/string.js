String.prototype.startsWith = function(str, ignoreCase) {
  return (ignoreCase ? this.toUpperCase() : this)
    .indexOf(ignoreCase ? str.toUpperCase() : str) == 0;
};