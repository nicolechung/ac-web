
var Prismic = require('prismic.io');
var _ = require('lodash');
var express = require('express');
var moment = require('moment');
var prerender = require('prerender-node');
var minutils = require('../api/observations/min-utils');

var getForecastData = require('../api/forecasts').getForecastData;
var forecastRegions = require('../api/forecasts/forecast-regions');

var prerenderRouter = express.Router();
var get = function get(route, handler){ prerenderRouter.get(route, prerenderGuard(handler)); }


var SHARE_LOGO = 'http://res.cloudinary.com/avalanche-ca/image/upload/bo_20px_solid_rgb:fff,c_pad,h_315,w_600/v1413919754/logos/avalanche_canada_left_quqmls.jpg';

get('/map/forecasts/:region', forecastPage);
get('/forecasts/:region',     forecastPage);
get('/forecasts/:region/archives/:date', forecastPage)


get('/mountain-information-network/submissions/:id', minSubmission);

get('/map', tags([['og:title',       'Avalanche Canada'],
                  ['og:description', 'Get the latest avalanche forecast'],
                  ['og:image', SHARE_LOGO]]));


get('/blogs', tags([['og:title',       'Avalanche Canada Blogs'],
                  ['og:description', 'Stay up to date'],
                  ['og:image', SHARE_LOGO]]));

get('/news', tags([['og:title',     'Avalanche Canada News'],
                  ['og:description', 'Stay up to date'],
                  ['og:image', SHARE_LOGO]]));

get('/events', tags([['og:title',     'Avalanche Canada Events'],
                     ['og:description', 'Stay up to date'],
                     ['og:image', SHARE_LOGO]]));

get('/weather/forecast', latestForecast)
get('/weather/forecast/:date', weatherForecast)

get('/blogs/:uid', blogPost);
get('/news/:uid',  newsPost);
get('/events/:uid',  eventPost);

//TODO(wnh): add all static pages here stuff
get('/membership',  staticPage('membership-overview'));
get('/youth',       staticPage('youth'));


// FALLBACK
get('*', tags([['og:title',       'Avalanche Canada'],
               ['og:description', 'Get the latest avalanche forecast'],
               ['og:image',       'http://res.cloudinary.com/avalanche-ca/image/upload/bo_20px_solid_rgb:fff,c_pad,h_315,w_600/v1413919754/logos/avalanche_canada_left_quqmls.jpg']]));

function prerenderGuard(fn){
    return function(req, res, next) {
        if(!prerender.shouldShowPrerenderedPage(req)) {
            return next();
        } else {
            console.log('Showing Prerender...');
            fn(req,res,next);
        }
    }
}

function tags(tags){
    var out = renderTags(tags);
    return function (req, res){
        res.status(200).send(out);
    }
}


function renderTags(tags) {
    var tpl = ['<html><head>'];
    tags.push(['twitter:card',   'summary_large_image'], 
              ['twitter:site',   '@avalancheca']);
    _.each(tags, function(i) { 
        // Dont add null/undefined tags 
        // Saves a ton of work in the calling functions
        if(i[1]) {
            tpl.push('<meta property="', i[0], '" content="', i[1], '" />')
        }
    });
    tpl.push('</head><body></body></head>');
    return tpl.join('');
}

function forecastPage(req,res) {
    var region = _.find(forecastRegions.features, {id: req.params.region});
    if(!region){
        res.status(404).send('NOT FOUND');
    }
    getForecastData(req.params.region, region)
        .then(function(data){
            console.log(JSON.stringify(data.json, null, '  '));
            var out = renderTags([
                ['og:title', 'Latest forecast for ' + data.json.bulletinTitle],
                ['og:description',  cleanHTML(data.json.highlights)],
            ]);
            res.status(200).send(out)
        });
}

function cleanHTML(txt) {
    return txt.replace(/\n/g, '')
        .replace(/.*<\/style>/m, '')
        .replace(/<.*?>/g, '')
}


function prismicQuery(query, options, cb) {
    Prismic.api("https://avalancheca.prismic.io/api", function(err, api){
        if(err){ 
            cb(err); 
        }
        api.query(query, options, function(err, docs) {
            if(err){ 
                cb(err);
            }
            cb(null, docs);
        });
    });
}

function staticPage(uid) {
    return function(req, res) {
        singleItem(Prismic.Predicates.at('my.static-page.uid', uid), {}, function(doc){
            console.log(doc);
            var title = doc.getText('static-page.title');
            var headline = doc.getText('static-page.headline');
            var banner = doc.getImage('static-page.banner');

            //TODO(wnh): Remove full tag if value doesnt exist
            res.status(200).send(renderTags([
                ['og:title',       title],
                ['og:description', headline],
                ['og:image',       banner && banner.url],
            ]));
        });
    }
}

function singleItem(query, opts, cb) {
    prismicQuery(query, opts, function(err, data){
        if(err){ 
            console.error(err);
            return res.status(500).send('<html><body>Error</body></html>');
        } else if(data.results_size !== 1) {
            return res.status(404).send('<html><body>Not Found</body></html>');
        }
        cb(data.results[0]);
    });
}
function newsPost(req, res) {
    singleItem(Prismic.Predicates.at('my.news.uid', req.params.uid), {}, function(doc){

        var title    = doc.getText('news.title');
        var headline = doc.getText('news.shortlede');
        var img      = doc.getImage('news.featured_image');

        res.status(200).send(renderTags([
            ['og:title',       title],
            ['og:description', headline],
            ['og:image',       img && img.url],
        ]));
    })
}
function blogPost(req, res) {
    singleItem(Prismic.Predicates.at('my.blog.uid', req.params.uid), {}, function(doc){
        var title    = doc.getText('blog.title');
        var headline = doc.getText('blog.shortlede');
        var img      = doc.getImage('blog.preview_image');

        res.status(200).send(renderTags([
            ['og:title',       title],
            ['og:description', headline],
            ['og:image',       img && img.url],
        ]));
    })
}
function eventPost(req, res) {
    singleItem(Prismic.Predicates.at('my.event.uid', req.params.uid), {}, function(doc){
        var title    = doc.getText('event.title');
        var headline = doc.getText('event.description');
        var img      = doc.getImage('event.featured_image');

        res.status(200).send(renderTags([
            ['og:title',       title],
            ['og:description', headline],
            ['og:image',       img && img.url],
        ]));
    })
}

function weatherForecast(req,res){
    return forecasreutrntByDate(req.params.date, req, res);
}

function latestForecast(req, res) {
    var d = moment().format('YYYY-MM-DD');
    return forecastByDate(d, req, res);
}
function forecastByDate(date, req, res){

    singleItem([['at', 'document.type', 'weather-forecast'], ['at', 'my.weather-forecast.date', date]], {}, function(doc){
        var title    = doc.getText('weather-forecast.headline');
        var headline = doc.getText('weather-forecast.synopsis');
        var img      = doc.getImage('weather-forecast.day1-image1');

        res.status(200).send(renderTags([
            ['og:title',       title],
            ['og:url',       'https://' +  req.host + '/weather/forecast/'+ date],
            ['og:description', headline],
            ['og:image',       img && img.url],
        ]));
    });
}


function minSubmission(req, res) {
    var subId = req.params.id;
    console.log(subId);

    minutils.getSubmission(subId, 'web', function(err, data){
        var sub =  data[0];
        var imgKey = sub.uploads.length > 0 && sub.uploads[0];

        console.log(JSON.stringify(sub, null, '  '));
        console.log(_.map(sub.obs, o => o.ob.comment));
        

        res.status(200).send(renderTags([
            ['og:title',     sub.title],
            ['og:url',       'https://' +  req.host + '/mountain-information-network/submissions/' + subId],
            ['og:description', getSubmissionComment(sub)],
            ['og:image', imgKey && minUploadKeyToUrl(imgKey)],
        ]));
    });
}

function minUploadKeyToUrl(key) {
    return 'https://s3-us-west-2.amazonaws.com/ac-min-uploads/' + key;
}

function getSubmissionComment(sub) {
    var obs = _.keyBy(sub.obs, o => o.obtype);
    if(obs.quick) {
        return obs.quick.ob.comment;
    } else if (obs.avalanche) {
        return obs.avalanche.ob.avalancheObsComment;
    } else if (obs.snowpack) {
        return obs.snowpack.ob.snowpackObsComment;
    } else if (obs.weather) {
        return obs.weather.ob.weatherObsComment;
    } else if (obs.incident) {
        return obs.incident.ob.incidentObsComment;
    }
}

module.exports = prerenderRouter
