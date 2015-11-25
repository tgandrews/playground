var circles = [
	{ color: '#21a5ad', size: 84, angle: Math.PI / 3 },
	{ color: '#ffad10', size: 92, angle: - Math.PI / 3 },
	{ color: '#ef4239', size: 100, angle: 0 }
];
var segmentsPerCircle = 200;
var speed = .8;
function twistEasing(t)
{
	return (t < .5) ? 2 * t * t : 1 - 2 * (t = 1 - t) * t;
}

var c = document.getElementById('c'),
	ctx = c.getContext('2d');
Math.PI2 = 2 * Math.PI;

function rotateX(p, a)
{
	var d = Math.sqrt(p[2] * p[2] + p[1] * p[1]),
		na = Math.atan2(p[1], p[2]) + a;
	return [p[0], d * Math.sin(na), d * Math.cos(na)];
}
function rotateY(p, a)
{
	var d = Math.sqrt(p[2] * p[2] + p[0] * p[0]),
		na = Math.atan2(p[2], p[0]) + a;
	return [d * Math.cos(na), p[1], d * Math.sin(na)];
}
function rotateZ(p, a)
{
	var d = Math.sqrt(p[1] * p[1] + p[0] * p[0]),
		na = Math.atan2(p[1], p[0]) + a;
	return [d * Math.cos(na), d * Math.sin(na), p[2]];
}

function resize()
{
	c.width = c.offsetWidth;
	c.height = c.offsetHeight;
	ctx.translate(c.width *.5, c.height * .5);
	ctx.lineWidth = 5;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'round';
}
window.addEventListener('resize', resize);
resize();

var angleOffset = 0;
var angleOffsetGoal = 0;
c.addEventListener('mousemove', function(e) { angleOffsetGoal = Math.PI2 * (e.clientX / c.width - .5); });
c.addEventListener('mouseout', function(e) { angleOffsetGoal = 0; });

function loxo(radius, angle, segments)
{
	var r = [];
	for(var i = 0; i < segments; i++)
	{
		var a = Math.PI2 * i / segments,
			c = Math.cos(a),
			s = Math.sin(a);
		var ax = Math.PI * .5;
		ax -= (c + 1) * .5 * angle;
		r.push([radius * c, radius * s * Math.sin(ax), radius * s * Math.cos(ax)]);
	}
	return r;
}

function loop()
{
	requestAnimationFrame(loop);
	angleOffset += (angleOffsetGoal - angleOffset) * .1;
	ctx.clearRect(-c.width*.5,-c.height*.5,c.width,c.height);
	var t = Date.now() * 1e-3 * speed % Math.PI;
	var rotationY = -t - Math.PI * .5;
	var rotationZ = Math.PI * .5 * Math.cos(t);
	var twist = twistEasing((Math.cos(t * 2 + Math.PI) + 1) * .5),
		twistAngle = twist * 2 * Math.PI2,
		twistSign = (t * 2 > Math.PI ? 1 : -1);
	//var base = loxo(100, 0, 200);
	var circlesPoints = [];
	var i, l, j, ll;
	for(i = 0, l = circles.length; i < l; i++)
	{
		var pts = loxo(circles[i].size, twistAngle, segmentsPerCircle);
		for(j = 0, ll = segmentsPerCircle; j < ll; j++)
		{
			pts[j] = rotateX(pts[j], circles[i].angle * (1 - twist) * twistSign);
			pts[j] = rotateY(rotateZ(rotateY(pts[j], rotationY), rotationZ), angleOffset);
		}
		circlesPoints.push(pts);
	}
	// Ugly trick for correct z-ordering : draw in 2 steps
	for(i = circles.length - 1; i >= 0; i--)
	{
		ctx.strokeStyle = circles[i].color;
		ctx.beginPath();
		for(j = 0, ll = segmentsPerCircle; j < ll; j++)
		{
			var p = circlesPoints[i][j];
			if(p[2] < 0) continue;
			var prev = circlesPoints[i][j == 0 ? ll - 1 : j - 1];
			ctx.moveTo(prev[0], prev[1]);
			ctx.lineTo(p[0], p[1]);
		}
		ctx.stroke();
	}
	for(i = 0, l = circles.length; i < l; i++)
	{
		ctx.strokeStyle = circles[i].color;
		ctx.beginPath();
		for(j = 0, ll = segmentsPerCircle; j < ll; j++)
		{
			var p = circlesPoints[i][j];
			if(p[2] > 0) continue;
			var prev = circlesPoints[i][j == 0 ? ll - 1 : j - 1];
			ctx.moveTo(prev[0], prev[1]);
			ctx.lineTo(p[0], p[1]);
		}
		ctx.stroke();
	}
}
requestAnimationFrame(loop);
