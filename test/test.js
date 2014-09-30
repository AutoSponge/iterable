var curry = fn => a => b => fn( a, b );
var map1 = ( fn, iterable ) => [for (i of iterable) i].map( fn );
var map2 = ( fn, iterable ) => [...iterable].map( fn );
var map3 = ( fn, iterable ) => [for (i of iterable) fn( i )];

var reduce1 = ( fn, a, iterable ) => [for (i of iterable) i].reduce( fn, a );
var reduce2 = ( fn, a, iterable ) => [...iterable].reduce( fn, a );
var reduce3 = ( fn, a, iterable ) => {
    var b = a;
    for ( let i of iterable ) {
        b = fn( b, i );
    }
    return b;
};
var add = ( a, b ) => a + b;
var add1 = curry( add )( 1 );
var arr = [1,2,3];

var s = new Set();
s.add( 1 );
s.add( 2 );
s.add( 3 );

const iterable = {
    *[Symbol.iterator](){
        yield 1;
        yield 2;
        yield 3;
    }
}
function *gen() {
    yield 1;
    yield 2;
    yield 3;
}


var messages = document.getElementById( 'messages' );
function createSuite( name ) {
    var ul = document.createElement( 'ul' );
    var li = document.createElement( 'li' );
    li.textContent = 'Suite: ' + name;
    ul.appendChild( li );
    messages.appendChild( ul );
    return {
        suite: new Benchmark.Suite,
        elm: ul 
    };
}

var test1 = createSuite( 'map' );
var test2 = createSuite( 'reduce' );

// add tests
test1.suite.add( 'native map array', function () {
    console.assert( String( [1,2,3].map( add1 ) ) === "2,3,4" );
} )

    .add( 'map1 array', function () {
        console.assert( String( map1( add1, arr ) ) === "2,3,4" );
    } )
    .add( 'map2 array', function () {
        console.assert( String( map2( add1, arr ) ) === "2,3,4" );
    } )
    .add( 'map3 array', function () {
        console.assert( String( map3( add1, arr ) ) === "2,3,4" );
    } )

    .add( 'map1 iterable', function () {
        console.assert( String( map1( add1, iterable ) ) === "2,3,4" );
    } )
    .add( 'map2 iterable', function () {
        console.assert( String( map2( add1, iterable ) ) === "2,3,4" );
    } )
    .add( 'map3 iterable', function () {
        console.assert( String( map3( add1, iterable ) ) === "2,3,4" );
    } )

    .add( 'map1 set', function () {
        console.assert( String( map1( add1, s ) ) === "2,3,4" );
    } )
    .add( 'map2 set', function () {
        console.assert( String( map2( add1, s ) ) === "2,3,4" );
    } )
    .add( 'map3 set', function () {
        console.assert( String( map3( add1, s ) ) === "2,3,4" );
    } )

    .add( 'map1 generator', function () {
        console.assert( String( map1( add1, gen() ) ) === "2,3,4" );
    } )
    .add( 'map2 generator', function () {
        console.assert( String( map2( add1, gen() ) ) === "2,3,4" );
    } )
    .add( 'map3 generator', function () {
        console.assert( String( map3( add1, gen() ) ) === "2,3,4" );
    } )
 /**/
    .on( 'cycle', function ( event ) {
        test1.elm.insertAdjacentHTML( 'beforeend', '<li>' + String( event.target ) + '</li>' );
    } )
    .on( 'complete', function () {
        test1.elm.insertAdjacentHTML( 'beforeend', '<li>Fastest is ' + this.filter( 'fastest' ).pluck( 'name' ) + '</li>' );
    } )
// run async
    .run( { 'async': true } );
    

test2.suite.add( 'native reduce array', function () {
    console.assert( [1, 2, 3].reduce( add, 2 ) === 8 );
} )
    .add( 'reduce1 array', function () {
        console.assert( reduce1( add, 2, [1, 2, 3] ) === 8 );
    } )
    .add( 'reduce2 array', function () {
        console.assert( reduce2( add, 2, [1, 2, 3] ) === 8 );
    } )
    .add( 'reduce3 array', function () {
        console.assert( reduce3( add, 2, [1, 2, 3] ) === 8 );
    } )

    .add( 'reduce1 iterable', function () {
        console.assert( reduce1( add, 2, iterable ) === 8 );
    } )
    .add( 'reduce2 iterable', function () {
        console.assert( reduce2( add, 2, iterable ) === 8 );
    } )
    .add( 'reduce3 iterable', function () {
        console.assert( reduce3( add, 2, iterable ) === 8 );
    } )

    .add( 'reduce1 set', function () {
        console.assert( reduce1( add, 2, s ) === 8 );
    } )
    .add( 'reduce2 set', function () {
        console.assert( reduce2( add, 2, s ) === 8 );
    } )
    .add( 'reduce3 set', function () {
        console.assert( reduce3( add, 2, s ) === 8 );
    } )

    .add( 'reduce1 generator', function () {
        console.assert( reduce1( add, 2, gen() ) === 8 );
    } )
    .add( 'reduce2 generator', function () {
        console.assert( reduce2( add, 2, gen() ) === 8 );
    } )
    .add( 'reduce3 generator', function () {
        console.assert( reduce3( add, 2, gen() ) === 8 );
    } )
// add listeners
    .on( 'cycle', function ( event ) {
        test2.elm.insertAdjacentHTML( 'beforeend', '<li>' + String( event.target ) + '</li>' );
    } )
    .on( 'complete', function () {
        test2.elm.insertAdjacentHTML( 'beforeend', '<li>Fastest is ' + this.filter( 'fastest' ).pluck( 'name' ) + '</li>' );
    } )
// run async
    .run( { 'async': true } );
/**/
