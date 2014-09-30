var reduce1 = ( fn, iterable ) => a => [for (i of iterable) i].reduce( fn, a );
var reduce2 = ( fn, iterable ) => a => [...iterable].reduce( fn, a );
var reduce3 = ( fn, iterable ) => a => {
    var b = a;
    for ( let i of iterable ) {
        b = fn( b, i );
    }
    return b;
};
var add = ( a, b ) => a + b;
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

var suite = new Benchmark.Suite;

var status = document.getElementById( 'status' );
var tests = document.getElementById( 'tests' );
var results = document.getElementById( 'results' );
status.textContent = 'running...';

// add tests
suite.add( 'native reduce array', function () {
    console.assert( [1, 2, 3].reduce( add, 2 ) === 8 );
} )
    .add( 'reduce1 array', function () {
        console.assert( reduce1( add, [1, 2, 3] )( 2 ) === 8 );
    } )
    .add( 'reduce2 array', function () {
        console.assert( reduce2( add, [1, 2, 3] )( 2 ) === 8 );
    } )
    .add( 'reduce3 array', function () {
        console.assert( reduce3( add, [1, 2, 3] )( 2 ) === 8 );
    } )

    .add( 'reduce1 iterable', function () {
        console.assert( reduce1( add, iterable )( 2 ) === 8 );
    } )
    .add( 'reduce2 iterable', function () {
        console.assert( reduce2( add, iterable )( 2 ) === 8 );
    } )
    .add( 'reduce3 iterable', function () {
        console.assert( reduce3( add, iterable )( 2 ) === 8 );
    } )

    .add( 'reduce1 generator', function () {
        console.assert( reduce1( add, gen() )( 2 ) === 8 );
    } )
    .add( 'reduce2 generator', function () {
        console.assert( reduce2( add, gen() )( 2 ) === 8 );
    } )
    .add( 'reduce3 generator', function () {
        console.assert( reduce3( add, gen() )( 2 ) === 8 );
    } )
// add listeners
    .on( 'cycle', function ( event ) {
        tests.insertAdjacentHTML( 'beforeend', '<li>' + String( event.target ) + '</li>' );
    } )
    .on( 'complete', function () {
        status.textContent = 'done.';
        results.textContent = 'Fastest is ' + this.filter( 'fastest' ).pluck( 'name' );
    } )
// run async
    .run( { 'async': true } );

