$(document).ready(function () {

    // Function for delete
    $(".delete-btn").click(function (event) {
        event.preventDefault();
        var id = $(this).attr("data");
        $.ajax("/remove/${id}", {
            type: "PUT"
        }).then(function () {
            location.reload();
        });
    });

    // Function for opening note modal
    $(".note-btn").click(function (event) {
        event.preventDefault();
        var id = $(this).attr("data");
        $("#article-id").text(id);
        $("#save-note").attr("data", id);
        $.ajax("/articles/${id}", {
            type: "GET"
        }).then(function (data) {
            console.log(data)
            $(".articles-available").empty();
            if (data[0].note.length > 0) {
                data[0].note.forEach(function (j) {
                    $(".articles-available")
                        .append($(`<li class='list-group-item'>${j.text}
                        <button type='button' class='btn btn-danger btn-sm float-right btn-deletenote' data='${j._id}'>
                        x</button></li>`));
                })
            }
            else {
                $(".articles-available")
                .append($(`<li class='list-group-item'>
                This article has no notes.</li>`));
            }
        })
        $("#note-modal").modal("toggle");
    });

    $(document).on("click", ".btn-deletenote", function () {
        event.preventDefault();
        // console.log($(this).attr("data"))
        var id = $(this).attr("data");
        // console.log(id);
        $.ajax("/note/${id}", {
            type: "DELETE"
        }).then(function () {
            $("#note-modal").modal("toggle");
        });
    });

    $("#save-note").click(function (event) {
        event.preventDefault();
        var id = $(this).attr("data");
        var noteText = $("#note-input").val().trim();
        $("#note-input").val("");
        $.ajax("/note/${id}", {
            type: "POST",
            data: { text: noteText }
        }).then(function (data) {
            console.log(data)
        })
        $("#note-modal").modal("toggle");
    });

    $(".save-btn").click(function (event) {
        event.preventDefault();
        var button = $(this);
        var id = button.attr("id");
        $.ajax("/save/${id}", {
            type: "PUT"
        }).then(function () {
            var alert = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
        Your note was saved!
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>`
            button.parent().append(alert);
        }
        );
    });
})