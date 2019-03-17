// graph variables
		var	xScale				   ,
			yScale				   ,
			xAxis				   ,
			yAxis				   ;

		// chart dimensions
		var margin   = { top: 20, right: 30, bottom: 20, left: 70 },
			width    =  $('#chart').width() - margin.left - margin.right,
			height   =  $(window).height() / 3.5 - margin.top - margin.bottom;

		// color palette for graph
		var colors = [ '#4398B5', '#ADC4CC', '#92B06A', '#E09D2A', '#DE5F32' ];

		var data = [
			{ id : 1, value : 100},
			{ id : 2, value : 200},
			{ id : 3, value : 300},
			{ id : 4, value : 400},
			{ id : 5, value : 500}
		];

		// svg object for graph
		var svg;

		xScale = d3.scaleBand()
				   .domain( d3.range( data.length ) )
				   .range( [ 0, width ] )
				   .padding( 0.1 );

		var yMax = d3.max( data, function( d ) {
			return d.value;
		});

		yScale = d3.scaleLinear()
				   .domain( [ 0, yMax  ] )
				   .range( [ height, 0 ] );


		xAxis = d3.axisBottom( xScale );
		yAxis = d3.axisLeft( yScale );

		var yTicks 	     = yAxis.ticks(5),
			yTicksFormat = yAxis.tickFormat( d3.format( '$,' ) );

		svg = d3.select( '#chart svg' )
						.attr('viewBox', '0 0 ' +  ( width + margin.left + margin.right ) + ' ' + ( height  + margin.top + margin.bottom ) )
						.attr('height', ( height + 'px' ) )
						.attr('width', '100%')
						.attr('preserveAspectRatio', 'none')
						.append( 'g' )
						.attr( 'transform', 'translate(' + margin.left + ',' + margin.top + ')' );

		var bars = svg.selectAll( 'rect' )
		   .data( data )
		   .enter()
		   .append( 'rect' )
			   .attr('x', function ( d, i ) {
					return xScale( i );
			   })
			   .attr('y', function( d, i ) {
					return yScale( 0 );
			   })
			   .attr( 'height', function( d ) {
				   return height - yScale( 0 );
			   })
			   .attr( 'width', xScale.bandwidth() )
			   .attr('fill', function( d, i ) {
				   return colors[ i ];
			   })
			   .transition()
			   .duration( 1500 )
			   .attr( 'y', function( d, i ) {
				   return yScale( d.value );
			   })
			   .attr( 'height', function( d ) {
				   return height - yScale( d.value );
			   });

var circles = svg.selectAll( '.circles' )
		   .data( data )
		   .enter()
		   .append( 'circle' ).attr("cursor", "pointer")
			   .attr('cx', function ( d, i ) {
					return xScale( i )+ xScale.bandwidth()-4;
			   })
			   .attr('cy', function( d, i ) {
					return yScale( 0 );
			   })
			   .attr('fill', "red").attr("r", 8)
			   .transition()
			   .duration( 1500 )
			   .attr( 'cy', function( d, i ) {
				   return yScale( d.value );
			   });
				 
				 d3.selectAll("circle").on("mouseover", function(){ d3.select(this).attr("fill", "darkred")}).on("mouseout", function(){
				 d3.select(this).attr("fill", "red")
				 });

var xtext = svg.selectAll( '.xtext' )
		   .data( data )
		   .enter()
		   .append( 'text' )
			   .attr('x', function ( d, i ) {
					return xScale( i )+ xScale.bandwidth()-4;
			   })
			   .attr('y', function( d, i ) {
					return yScale( 0 );
			   })
			   .attr('fill', "white")
.attr("text-anchor", "middle")
.attr("dominant-baseline", "central").attr("pointer-events", "none")
.text("x")
			   .transition()
			   .duration( 1500 )
			   .attr( 'y', function( d, i ) {
				   return yScale( d.value ) - 1;
			   });

		svg.append( 'g' )
		   .attr( 'class', 'yAxis' )
		   .attr( 'transform', 'translate(0, ' + (-1) + ')')
		   .call( yAxis );