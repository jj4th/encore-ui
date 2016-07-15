describe('rxDate', function () {
    var rxDate;
    var rxMomentFormats;
    var dateString;
    var actual, expected;

    beforeEach(function () {
        module('encore.ui.utilities');

        dateString = '2015-09-17T19:37:17Z';

        inject(function ($filter, _rxMomentFormats_) {
            rxDate = $filter('rxDate');
            rxMomentFormats = _rxMomentFormats_;
        });
    });

    it('should exist', function () {
        expect(rxDate).to.exist;
    });

    describe('using default format', function () {
        beforeEach(function () {
            actual = rxDate(dateString);
        });

        it('should result in expected value', function () {
            expected = moment(dateString).format(rxMomentFormats.date.long);
            expect(actual).to.equal(expected);
        });
    });

    describe('using "long" format', function () {
        beforeEach(function () {
            actual = rxDate(dateString, 'long');
        });

        it('should result in expected value', function () {
            expected = moment(dateString).format(rxMomentFormats.date.long);
            expect(actual).to.equal(expected);
        });
    });

    describe('using "short" format', function () {
        beforeEach(function () {
            actual = rxDate(dateString, 'short');
        });

        it('should result in expected value', function () {
            expected = moment(dateString).format(rxMomentFormats.date.short);
            expect(actual).to.equal(expected);
        });
    });

    describe('using invalid format', function () {
        beforeEach(function () {
            actual = rxDate(dateString, 'asdf');
        });

        it('should result in a "long" format value', function () {
            expected = moment(dateString).format(rxMomentFormats.date.long);
            expect(actual).to.equal(expected);
        });
    });
});
